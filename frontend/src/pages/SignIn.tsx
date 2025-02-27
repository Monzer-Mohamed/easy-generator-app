import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AuthForm from "../components/AuthForm";
import { signInSchema } from "../utils/validation";
import { handleSignIn } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

type SignInFormData = z.infer<typeof signInSchema>;

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const handleOnSubmit = async (data: SignInFormData) => {
    await handleSignIn(data, dispatch, navigate);
  };

  return (
    <AuthForm
      title="Sign In"
      fields={[
        { name: "email", label: "Email", type: "email", Placeholder: "Enter your email" },
        { name: "password", label: "Password", type: "password", Placeholder: "Enter your password" },
      ]}
      submitText="Sign In"
      onSubmit={handleSubmit(handleOnSubmit)}
      register={register}
      errors={errors}
      isSubmitting={isSubmitting}
      redirectText="Don't have an account?"
      redirectLink="/signup"
    />
  );
};

export default SignIn;
