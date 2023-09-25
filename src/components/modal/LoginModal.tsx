"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import Modal from "./Modal";
import Button from "@/UI/Button";
import Heading from "../Heading";
import Input from "@/UI/form/Input";

type Props = {
  signinOpen: boolean;
  setSigninOpen: () => void;
};

function LoginModal({ signinOpen, setSigninOpen }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleFormSubmit: SubmitHandler<FieldValues> = async function (data) {
    try {
      setIsLoading(true);

      const log = await signIn("credentials", { ...data, redirect: false });

      if (log?.ok) {
        toast.success("Logged in");
        setSigninOpen(false);
        router.refresh();
      }

      if (log?.error) {
        toast.error(log.error);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back!" subtitle="Login now" />
      <Input
        id="email"
        label="Email"
        placeholder="Enter your email(johndoe@gmail.com)"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        placeholder="Enter your password(test1234)"
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
      isOpen={signinOpen}
      title="Login"
      actionLabel="Continue"
      onClose={setSigninOpen}
      onSubmit={handleSubmit(handleFormSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}
export default LoginModal;
