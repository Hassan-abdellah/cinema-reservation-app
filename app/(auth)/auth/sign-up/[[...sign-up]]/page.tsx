import { SignUp } from "@clerk/nextjs";

const RegisterPage = () => {
  return (
    <section className="flex items-center justify-center h-screen">
      <SignUp
        signInUrl="/auth/sign-in"
        afterSignOutUrl="/auth/sign-in"
        oauthFlow="popup"
      />
    </section>
  );
};

export default RegisterPage;
