import { toast } from "sonner";
import { InferRequestType } from "hono";
import { useMutation, useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { InferResponseType } from "hono";

type RequestType = InferRequestType<
  (typeof client.api.projects)["$post"]
>["json"];
type ResponseType = InferResponseType<
  (typeof client.api.projects)["$post"],
  200
>;
export type ResponseType2 = InferResponseType<
  (typeof client.api.projects)[":id"]["$get"],
  200
>;

export function useCreateProject() {
  //   console.log("slient",client);
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      try {
        const response = await client.api.projects.$post({ json });

        if (!response.ok) {
          throw new Error("something went wrong");
        }

        return await response.json();
      } catch (error) {
        console.error("Error during API call:", error);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("project created");
      //TODO:Invaliate "projects" query
    },
    onError: (error) => {
      // toast.error("Failed to create a project")
      console.log(error.message);
    },
  });

  return mutation;
}

export const useGetProject = (id: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["project", { id }],
    queryFn: async () => {
      const response = await client.api.projects[":id"].$get({
        param: {
          id,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch project");
      }
      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
