// import React, { forwardRef } from "react";

// interface ErrorPopupProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   label?: string;
//   className?: string;
//   labelClassName?: string;
//   helperTextClassName?: string;
//   inputClassName?: string;
// }

// const ErrorPopup:forwardRef<HTMLInputElement, ErrorPopupProps>(
//   ({ label, className, labelClassName, inputClassName, ...props }, ref) => {
//   return (
// <div className="error-popup">
// <button className="close-btn" onClick={() => setShowErrors(false)}>✖</button>
// <h4>Validation Errors</h4>
// <ul>
//     {Object.entries(errors).map(([key, error]) => (
//         <li key={key}>{String(error?.message)}</li>
//     ))}
// </ul>
// </div>
//   );
// };
// );

// export default ErrorPopup;
