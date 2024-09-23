import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm() {
  const { register, handleSubmit, reset } = useForm();
  const queryCliet = useQueryClient();
  const { mutate, isLoading: createLoading } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("Yeni oda başarıyla oluşturuldu");
      queryCliet.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    mutate(data);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="name">Oda numarası</Label>
        <Input type="text" id="name" {...register("name")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Kapasite</Label>
        <Input type="number" id="maxCapacity" {...register("maxCapacity")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Fiyat</Label>
        <Input type="number" id="regularPrice" {...register("regularPrice")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">İndirim</Label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount")}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Oda hakkında</Label>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description")}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Oda fotoğrafı</Label>
        <FileInput id="image" accept="image/*" />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Vazgeç
        </Button>
        <Button disabled={createLoading}>Oda ekle</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
