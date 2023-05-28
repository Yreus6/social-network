package com.htcompany.snapplication;

public class GenericResponse {

    private String content;

    private GenericResponse() {}

    public GenericResponse(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
