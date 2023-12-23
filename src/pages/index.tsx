import {api} from "@/utils/api";
import DefaultPage from "@/layouts/default-page";
import Logo from "@/components/logo/logo";
import {type FormEvent, useEffect} from "react";
import {useRouter} from "next/router";

function serializeForm(formElement: HTMLFormElement) {
  const formDataObj: any = {};
  new FormData(formElement).forEach((value, key) => (formDataObj[key] = value));
   return formDataObj
}
export default function Home() {
  const router = useRouter()
  const loginRequest = api.user.signIn.useMutation();

  const onSubmit = (event: FormEvent) => {
    event.stopPropagation()
    event.preventDefault()
    const value= serializeForm(event.target as HTMLFormElement)
    loginRequest.mutate(value)
  }

  useEffect(() => {
    if(loginRequest.data){
      const {user, sessionToken} = loginRequest.data
      sessionStorage.setItem('user', JSON.stringify(user))
      sessionStorage.setItem('sessionToken', sessionToken)
      void router.push(`/${user.roleId}`)
    }
  }, [loginRequest.data])

  return (
    <DefaultPage title="Login">
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 shadow-2xl rounded">
          <Logo/>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:gap-8">
            <div
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-black hover:bg-white/20"
            >
              <form onSubmit={onSubmit} className="rounded px-8 pt-6 pb-8 mb-4" action="#" method="post">
                <div className="mb-4">
                  <label className="block text-black-700 text-sm font-bold mb-2" htmlFor="email">
                    E-mail
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email" name="email" type="text" placeholder="your@email.com"/>
                </div>
                <div className="mb-6">
                  <label className="block text-black-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-black-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password" name="password" type="password" placeholder="******************"/>
                </div>
                {loginRequest.error && <p className="text-red-500 text-xs italic">Something went
                  wrong! {loginRequest.error.message}</p>}

                <div className="flex items-center justify-between">
                  <button
                    disabled={loginRequest.isLoading}
                    className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    type="submit">
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </DefaultPage>
  );
}
