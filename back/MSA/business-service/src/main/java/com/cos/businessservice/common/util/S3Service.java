package com.cos.businessservice.common.util;

import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@NoArgsConstructor
public class S3Service {
//    private AmazonS3 s3Client;
//
//    @Value("${cloud.aws.credentials.accessKey}")
//    private String accessKey;
//
//    @Value("${cloud.aws.credentials.secretKey}")
//    private String secretKey;
//
//    @Value("${cloud.aws.s3.bucket}")
//    private String bucket;
//
//    @Value("${cloud.aws.region.static}")
//    private String region;
//
//    @PostConstruct
//    public void setS3Client() {
//
//        AWSCredentials credentials = new BasicAWSCredentials(this.accessKey, this.secretKey);
//
//        s3Client = AmazonS3ClientBuilder.standard()
//                .withCredentials(new AWSStaticCredentialsProvider(credentials))
//                .withRegion(this.region)
//                .build();
//    }
//
//    public Map<String, String> upload(MultipartFile file, String link) throws IOException {
//        // T = 트로피
//        //A = 학생인증
//        //B = 뱃지
//        //P = 포스터
//
//
//        byte[] bytes = IOUtils.toByteArray(file.getInputStream());
//
//        ObjectMetadata objectMetadata = new ObjectMetadata();
//        objectMetadata.setContentLength(bytes.length);
//        objectMetadata.setContentType(file.getContentType());
//
//
//        UUID uuid = UUID.randomUUID();
//        String fileName = link + "_"+ uuid.toString() + "_"+ file.getOriginalFilename();
//
//        s3Client.putObject(new PutObjectRequest(bucket + "/"+ link, fileName, file.getInputStream(), objectMetadata)
//                .withCannedAcl(CannedAccessControlList.PublicRead));
//
//        Map<String, String> map = new HashMap<>();
//        map.put("fileName" , fileName);
//        map.put("fileUrl" , s3Client.getUrl(bucket + "/"+ link, fileName).toString());
//
//
//        return map;
//    }
//
//    public void delete(String fileName) throws IOException {
//        // T = 트로피
//        //A = 학생인증
//        //B = 뱃지
//        //P = 포스터
//        StringTokenizer st = new StringTokenizer(fileName ,"_");
//        String link = st.nextToken();
//
//        s3Client.deleteObject(new DeleteObjectRequest(bucket + "/"+link, fileName));
//    }

}