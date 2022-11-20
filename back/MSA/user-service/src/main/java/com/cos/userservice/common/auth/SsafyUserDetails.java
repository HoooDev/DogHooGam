package com.cos.userservice.common.auth;



import com.cos.userservice.DB.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

public class SsafyUserDetails implements UserDetails , OAuth2User {
	private User user;

	private Map<String, Object> attributes;
    
    public SsafyUserDetails(User user) {
    	this.user = user;
    }
    
    public SsafyUserDetails(User user, Map<String, Object> attributes ) {
    	this.user = user;
    	this.attributes = attributes;
    }


	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		
		Collection<GrantedAuthority> collect = new ArrayList<>();
		collect.add(new GrantedAuthority() {
			@Override
			public String getAuthority() {
				// TODO Auto-generated method stub
				return user.getRole();
			}
		});
		
		return collect;
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return "";
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return user.getUserId();
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}
	
	
	//////////////////////////////////////////////////////////////////////

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public Map<String, Object> getAttributes() {
		return attributes;
	}

	public void setAttributes(Map<String, Object> attributes) {
		this.attributes = attributes;
	}

	@Override
	public String getName() {
		return (String) attributes.get("name");
	}
}
