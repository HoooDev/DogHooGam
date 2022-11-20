package com.cos.businessservice.common.util;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.util.IOUtils;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.StringTokenizer;
import java.util.UUID;

@Service
@NoArgsConstructor
public class S3Service {
    private AmazonS3 s3Client;

    @Value("${cloud.aws.credentials.access-key}")
    private String accessKey;

    @Value("${cloud.aws.credentials.secret-key}")
    private String secretKey;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.region.static}")
    private String region;

//    private Environment env;
//
//    public S3Service(Environment env) {
//        this.env = env;
//    }




    @PostConstruct
    public void setS3Client() {

        AWSCredentials credentials = new BasicAWSCredentials(this.accessKey, this.secretKey);

        s3Client = AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .withRegion(this.region)
                .build();

//        AWSCredentials credentials = new BasicAWSCredentials(env.getProperty("cloud.aws.credentials.accessKey"),env.getProperty("cloud.aws.credentials.secretKey"));
//
//        s3Client = AmazonS3ClientBuilder.standard()
//                .withCredentials(new AWSStaticCredentialsProvider(credentials))
//                .withRegion(env.getProperty("cloud.aws.region.static"))
//                .build();
//
//        bucket = env.getProperty("cloud.s3.bucket");
    }

    public Map<String, String> upload(MultipartFile file, String link) throws IOException {

        byte[] bytes = IOUtils.toByteArray(file.getInputStream());

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(bytes.length);
        objectMetadata.setContentType(file.getContentType());


        UUID uuid = UUID.randomUUID();
        String fileName = link + "_"+ uuid.toString() + "_"+ file.getOriginalFilename();

        s3Client.putObject(new PutObjectRequest(bucket + "/"+ link, fileName, file.getInputStream(), objectMetadata)
                .withCannedAcl(CannedAccessControlList.PublicRead));

        Map<String, String> map = new HashMap<>();
        map.put("fileName" , fileName);
        map.put("fileUrl" , s3Client.getUrl(bucket + "/"+ link, fileName).toString());


        return map;
    }

    public void delete(String fileName) throws IOException {
        // T = 트로피
        //A = 학생인증
        //B = 뱃지
        //P = 포스터
        StringTokenizer st = new StringTokenizer(fileName ,"_");
        String link = st.nextToken();

        s3Client.deleteObject(new DeleteObjectRequest(bucket + "/"+link, fileName));
    }

}