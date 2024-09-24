import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;
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
    mutate({ ...data, image: data.image[0] });
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Oda numarası" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "Bu alanı doldurmak zorunludur",
          })}
        />
      </FormRow>

      <FormRow label="Kapasite" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "Bu alanı doldurmak zorunludur",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Fiyat" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "Bu alanı doldurmak zorunludur",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="İndirim" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "Bu alanı doldurmak zorunludur",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "İndirim normal fiyatın altında olmalı",
          })}
        />
      </FormRow>

      <FormRow label="Oda hakkında" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "Bu alanı doldurmak zorunludur",
          })}
        />
      </FormRow>

      <FormRow label="Oda fotoğrafı">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: "Bu alanı doldurmak zorunludur",
          })}
        />
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
