import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AuthForm from "../components/AuthForm";
import { signUpSchema } from "../utils/validation";
import { handleSignUp } from "../services/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUp = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });


    const handleOnSubmit = async (data: SignUpFormData) => {
      await handleSignUp(data,dispatch, navigate);
    };
  return (
    <AuthForm
      title="Sign Up"
      fields={[
        { name: "username", label: "User Name", type: "text", Placeholder: "Enter your name" },
        { name: "email", label: "Email", type: "email", Placeholder: "Enter your email" },
        { name: "password", label: "Password", type: "password", Placeholder: "Enter your password" },
      ]}
      submitText="Sign Up"
      onSubmit={handleSubmit(handleOnSubmit)}
      register={register}
      errors={errors}
      isSubmitting={isSubmitting}
      redirectText="Already have an account?"
      redirectLink="/signin"
    />
  );
};

export default SignUp;
