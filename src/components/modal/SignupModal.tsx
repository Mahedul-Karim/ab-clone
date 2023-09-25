"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";

import Modal from "./Modal";
import Button from "@/UI/Button";
import Heading from "../Heading";
import Input from "@/UI/form/Input";


type Props={
    modalOpen:boolean;
    setModalOpen:any;
}

function SignupModal({modalOpen,setModalOpen}:Props) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleFormSubmit: SubmitHandler<FieldValues> =  async function (data) {
    try{
      setIsLoading(true);

      await axios.post('/api/register',data);

      toast.success('Registered')

    }catch(err){
      console.log(err)
    }finally{
      setIsLoading(false);
    }

  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
      <Input
        id="email"
        label="Email"
        placeholder="Enter your email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        placeholder="Enter your name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        placeholder="Enter your password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline={true}
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {}}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {}}
      />
    
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={modalOpen}
      title="Register"
      actionLabel="Continue"
      onClose={setModalOpen}
      onSubmit={handleSubmit(handleFormSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}
export default SignupModal;
