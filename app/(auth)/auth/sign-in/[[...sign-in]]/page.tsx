import { SignIn } from "@clerk/nextjs";

const LoginPage = () => {
  return (
    <section className="flex items-center justify-center h-screen">
      <SignIn
        signUpUrl="/auth/sign-up"
        afterSignOutUrl="/auth/sign-in"
        oauthFlow="popup"
      />
    </section>
  );
};

export default LoginPage;
