package com.insrb.admin.exception;

public class InsuAuthExpiredException extends Exception {

  /**
   *
   */
  private static final long serialVersionUID = 1L;

  public InsuAuthExpiredException(String message) {
      super(message);
  }

}