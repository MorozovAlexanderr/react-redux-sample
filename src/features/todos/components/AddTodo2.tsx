import { FC } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { Form, Formik, useField, FormikHelpers } from 'formik';
import { useAppDispatch } from 'src/app/hooks';
import { createTodo } from 'src/features/todos/todosSlice';
import Input from 'src/components/Input';
import Button from 'src/components/Button';
import CategoriesPicker from 'src/features/categories/components/CategoriesPicker';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  categoryId: Yup.string().nullable().required('Required'),
});

const AddTodo: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleFormSubmit = (
    data: { title: string; categoryId: string },
    actions: FormikHelpers<{ title: string; categoryId: string }>
  ) => {
    dispatch(createTodo({ title: data.title, categoryId: data.categoryId }));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        title: '',
        categoryId: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      <StyledFormWrapper>
        <Fields>
          <div>
            <Title>Name</Title>
            <FormTitleInput name="title" />
          </div>
          <div>
            <Title>Category</Title>
            <FormCategoryPicker name="categoryId" />
          </div>
        </Fields>
        <Button title="Add" type="submit" />
      </StyledFormWrapper>
    </Formik>
  );
};

const FormTitleInput: FC<{ name: string }> = (props): JSX.Element => {
  const [field, meta] = useField(props);

  return (
    <Input
      name={props.name}
      value={field.value}
      placeholder="Type name"
      error={meta.error != null && meta.touched}
      maxLength={45}
      onChange={field.onChange}
    />
  );
};

const FormCategoryPicker: FC<{ name: string }> = (props): JSX.Element => {
  const [field, meta, helpers] = useField(props);

  return (
    <CategoriesPicker
      selectedCategoryId={field.value}
      error={meta.error != null && meta.touched}
      placeholder="Select category"
      onSelect={(opt) => helpers.setValue(opt.id)}
    />
  );
};

const StyledFormWrapper = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 325px;
  margin-top: 25px;

  & > * {
    width: 100%;
  }

  & button {
    margin-top: 20px;
  }
`;

const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Title = styled.p`
  margin-bottom: 5px;
  color: #787878;
`;

export default AddTodo;
