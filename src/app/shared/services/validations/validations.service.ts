import { Injectable } from '@angular/core';
import { ERRORS_VALIDATIONS } from 'src/app/data/constants';
import { ENUM_VALIDATION_OPTIONS } from '@data/enums';
import { IResponseValidation } from '@data/intefaces';

@Injectable({
  providedIn: 'root',
})
export class ValidationsService {
  validateField(value: any, type: ENUM_VALIDATION_OPTIONS) {
    switch (type) {
      case ENUM_VALIDATION_OPTIONS.EMAIL:
        return this.validateEmail(value);
      case ENUM_VALIDATION_OPTIONS.PASSWORD:
        return this.validatePassword(value);
    }
  }

  private validateEmail(v: any): IResponseValidation {
    const r: IResponseValidation = { msg: '', isValid: true };
    const pattern =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    r.isValid = pattern.test(v);

    r.msg =
      v === ''
        ? ERRORS_VALIDATIONS.EMAIL_REQUIRED_FIELD
        : ERRORS_VALIDATIONS.EMAIL_INVALID;
    // if (isValidMail === false) r.msg = 'El email no es valido';
    return r;
  }

  private validatePassword(v: any): IResponseValidation {
    const r: IResponseValidation = { msg: '', isValid: true };
    // const pattern = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,20}$/;
    // r.isValid = pattern.test(v);
    r.isValid = v.length > 5;
    r.msg =
      v === ''
        ? ERRORS_VALIDATIONS.PASSWORD_REQUIRED_FIELD
        : ERRORS_VALIDATIONS.PASSWORD_REQUIRED_PATTERN;
    return r;
  }
}
