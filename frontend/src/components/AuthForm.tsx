import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormEvent, useState } from "react";
import { Form, InputField, Button } from "../ui";
import { Link } from "react-router-dom";

interface AuthFormProps {
    title: string;
    fields: { name: string; label: string; type: string; Placeholder: string }[];
    submitText: string;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    register: UseFormRegister<any>;
    errors: FieldErrors;
    isSubmitting: boolean;
    redirectText: string;
    redirectLink: string;
}

const AuthForm = ({
    title,
    fields,
    submitText,
    onSubmit,
    register,
    errors,
    isSubmitting,
    redirectText,
    redirectLink,
}: AuthFormProps) => {
    const [showErrors, setShowErrors] = useState(false);
    const hasErrors = Object.keys(errors).length > 0;

    const handleBlur = () => {
        if (Object.keys(errors).length > 0) {
            setShowErrors(true);
        }
    };

    return (
        <div className="auth-wrapper">
            {hasErrors && showErrors && (
                <div className="error-popup">
                    <button className="close-btn" onClick={() => setShowErrors(false)}>✖</button>
                    <h4>Validation Errors</h4>
                    <ul>
                        {Object.entries(errors).map(([key, error]) => (
                            <li key={key}>{String(error?.message)}</li>
                        ))}
                    </ul>
                </div>
            )} 
            <div className="auth-container">
                <h2>{title}</h2>
                <Form
                    onSubmit={(e) => {
                        setShowErrors(true);
                        onSubmit(e);
                    }}
                    className="auth-form">
                    {fields.map(({ name, label, type, Placeholder }) => (
                        <div className="auth-form-group" key={name}>
                            <InputField
                                key={name}
                                {...register(name)}
                                type={type}
                                className="auth-input-container"
                                label={label}
                                labelClassName="auth-label"
                                inputClassName="auth-input"
                                placeholder={Placeholder}
                                onBlur={handleBlur}
                            />
                        </div>
                    ))}
                    <Button
                        text={isSubmitting ? "Loading..." : submitText}
                        type="submit"
                        className="button"
                        disabled={isSubmitting}
                    />
                </Form>
                <p>
                    {redirectText} <Link to={redirectLink}>Click here</Link>
                </p>
            </div>
        </div>
    );
};

export default AuthForm;
