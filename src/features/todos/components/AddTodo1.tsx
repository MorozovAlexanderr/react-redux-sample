import { FC } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from 'src/app/hooks';
import Input from 'src/components/Input';
import Button from 'src/components/Button';
import CategoriesPicker from 'src/features/categories/components/CategoriesPicker';
import { useForm, Controller } from 'react-hook-form';
import { TodoCreationForm } from 'src/features/todos/todos.types';
import { createTodo } from 'src/features/todos/todosSlice';

const AddTodo: FC = (): JSX.Element => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TodoCreationForm>({
    defaultValues: { categoryId: null, title: '' },
  });

  const dispatch = useAppDispatch();

  const handleFormSubmit = (data: TodoCreationForm) => {
    const { title, categoryId } = data;

    if (!categoryId || !title) return;
    dispatch(createTodo({ title, categoryId: categoryId }));

    reset({ categoryId: null, title: '' });
  };

  return (
    <Container onSubmit={handleSubmit(handleFormSubmit)}>
      <FieldsWrapper>
        <div>
          <Title>Name</Title>
          <Controller
            control={control}
            name="title"
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                value={field.value}
                placeholder="Type name"
                error={errors.title !== undefined}
                maxLength={45}
                onChange={field.onChange}
              />
            )}
          />
        </div>
        <div>
          <Title>Category</Title>
          <Controller
            control={control}
            name="categoryId"
            rules={{ required: true }}
            render={({ field }) => (
              <CategoriesPicker
                selectedCategoryId={field.value}
                error={errors.categoryId !== undefined}
                placeholder="Select category"
                onSelect={(opt) => field.onChange(opt.id)}
              />
            )}
          />
        </div>
      </FieldsWrapper>
      <Button title="Add" type="submit" />
    </Container>
  );
};

const Container = styled.form`
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

const FieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Title = styled.p`
  margin-bottom: 5px;
  color: #787878;
`;

export default AddTodo;
