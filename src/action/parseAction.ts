// import { isApiError } from "../server/type";
// import { toast } from "react-hot-toast";
// import { useTranslation } from "react-i18next";
//
// type MessageError = {
//   message: string;
// };
// export const isMessageError = (error: any): error is MessageError => {
//   return !!error.message;
// };
//
// export type ErrorType = "API" | "Module" | "unknown";
// type ActionErrorType = { type: ErrorType; data?: any } | undefined;
//
// export type ActionType<T> = {
//   result: T | undefined;
//   error: ActionErrorType;
// };

// export const parseAction = async <T>(
//   fn: () => Promise<T>
// ): Promise<ActionType<T>> => {
//   try {
//     const result = await fn();
//     return { result, error: undefined };
//   } catch (e: unknown) {
//     let actionError: ActionErrorType;
//     //api 에러 뿐만이 아나라 다른 에러가 일어날시에 대한 경우도 추가되어야함.
//     if (isApiError(e)) {
//       actionError = e;
//     } else if (isMessageError(e)) {
//       actionError = {
//         type: "unknown",
//         data: e.message,
//       };
//     }
//     return {
//       result: undefined,
//       error: actionError,
//     };
//   }
// };

export const actionHandler = async (
  actionResult: Promise<any>,
  resultHandler = (result: any) => {
    return result;
  },
  errorHandler = (e: any) => {
    console.warn(e);
    // alert(e?.body?.message);
    if (e?.body?.status === "401") {
      window.location.reload();
    }
    // if (e?.body?.path === "security-tokens/?fileCount=1") {
    //   toast.error("생성 실패하였습니다.");
    // }
  }
) => {
  const { result, error } = await actionResult;
  if (error) {
    return errorHandler(error);
  }
  return resultHandler(result);
};
