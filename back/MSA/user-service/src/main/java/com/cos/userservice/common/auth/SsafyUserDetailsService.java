package com.cos.userservice.common.auth;


import com.cos.userservice.DB.entity.User;
import com.cos.userservice.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class SsafyUserDetailsService implements UserDetailsService {
	
	@Autowired
	private UserService userService;

	@Override
	public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
		User userEntity = userService.getUserByUserId(userId);
		if(userEntity != null) {
			return new SsafyUserDetails(userEntity);
		}
		return null;

	}

}
