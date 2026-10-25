import { SignIn } from "@clerk/nextjs";

const LoginPage = () => {
  return (
    <section className="flex items-center justify-center h-screen">
      <SignIn
        signUpUrl="/auth/sign-up"
        signInUrl="/auth/sign-in"
        afterSignOutUrl="/auth/sign-in"
        forceRedirectUrl="/"
        oauthFlow="popup"
      />
    </section>
  );
};

export default LoginPage;
