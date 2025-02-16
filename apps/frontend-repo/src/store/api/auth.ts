import { auth } from "@/libs/firebase";
import { AuthRequest } from "../../../../../packages/types";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { deleteCookie } from "cookies-next";
import { setCookie } from "cookies-next/client";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, User } from "firebase/auth";
import { showToast } from "../toastSlice";

export const authApiSlice = createApi({
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation<User, AuthRequest>({
      queryFn: async (credentials) => {
        try {
          const { user } = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
          setCookie("token", await user.getIdToken(), { maxAge: 60 * 60 * 24 });
          return {
            data: user,
          };
        } catch (error) {
          return {
            error: {
              message: error ?? "Error logging in",
            }
          };
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(showToast({ message: "Successfully logged in", severity: "success", duration: 500 }));
        } catch (error) {
          dispatch(showToast({ message: "Failed logging in", severity: "error", duration: 500 }));
        }
      },
    }),
    register: builder.mutation<User, AuthRequest>({
      queryFn: async (credentials) => {
        try {
          const { user } = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
          setCookie("token", await user.getIdToken(), { maxAge: 60 * 60 * 24 });
          return {
            data: user,
          };
        } catch (error) {
          return {
            error: {
              message: error ?? "Error registering user",
            }
          };
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(showToast({ message: "Successfully registered user", severity: "success", duration: 500 }));
        } catch (error) {
          dispatch(showToast({ message: "Failed registering user", severity: "error", duration: 500 }));
        }
      },
    }),
    logout: builder.mutation<null, void>({
      queryFn: async () => {
        try {
          await auth.signOut();
          deleteCookie("token")
          return {
            data: null,
          };
        } catch (error) {
          return {
            error: {
              message: error ?? "Error logging out",
            }
          };
        }
      }
    })
  })
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApiSlice