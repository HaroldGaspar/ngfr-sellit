import { ENUM_VALIDATION_OPTIONS } from 'src/app/data/enums';
import { IField } from '@data/intefaces';
import { ValidationsService } from 'src/app/shared/services/validations/validations.service';
import { ERRORS_VALIDATIONS } from 'src/app/data/constants';

export const CONST_LOGIN_PAGE: {
  FORM: {
    email: IField;
    password: IField;
    STYLE_BACKGROUND: any;
  };
} = {
  FORM: {
    email: {
      val: '',
      error: ERRORS_VALIDATIONS.EMAIL_REQUIRED_FIELD,
      isValid() {
        const validationsService = new ValidationsService();
        const validateEmail = validationsService.validateField(
          this.val,
          ENUM_VALIDATION_OPTIONS.EMAIL
        );
        this.error = validateEmail.msg;
        console.log('emailvalid: ', validateEmail.isValid);
        return validateEmail.isValid;
      },
    },
    password: {
      val: '',
      error: ERRORS_VALIDATIONS.PASSWORD_REQUIRED_FIELD,
      isValid() {
        const validationsService = new ValidationsService();
        const validatePassword = validationsService.validateField(
          this.val,
          ENUM_VALIDATION_OPTIONS.PASSWORD
        );
        this.error = validatePassword.msg;
        console.log('passwordvalid: ', validatePassword.isValid);
        return validatePassword.isValid;
      },
    },
    STYLE_BACKGROUND: {
      marginTop: '1rem',
      display: 'flex',
      justifyContent: 'center',
    },
  },
};
