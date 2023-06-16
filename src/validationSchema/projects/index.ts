import * as yup from 'yup';

export const projectValidationSchema = yup.object().shape({
  location: yup.string().required(),
  soil_condition_data: yup.string().required(),
  excavator_id: yup.string().nullable().required(),
});
