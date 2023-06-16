import * as yup from 'yup';

export const invitationValidationSchema = yup.object().shape({
  role: yup.string().required(),
  invited_user_id: yup.string().nullable().required(),
  excavator_id: yup.string().nullable().required(),
});
