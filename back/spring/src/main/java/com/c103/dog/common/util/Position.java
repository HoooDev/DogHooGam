package com.c103.dog.common.util;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
public class Position {
    double lat;
    double lng;
}
