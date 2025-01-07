import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createCapsuleApi,
  deleteCapsuleApi,
  getCapsuleApi,
  getCapsulesApi,
  updateCapsule,
  updateCapsuleSharing,
} from '../utils/api';

export const useGetCapsules = (page: number, limit: number) => {
  return useQuery({
    queryKey: ['capsules', page, limit],
    queryFn: () => getCapsulesApi(page, limit),
    refetchOnWindowFocus: false,
  });
};

export const useGetCapsule = (capsuleId: string) => {
  return useQuery({
    queryKey: ['capsule', capsuleId],
    queryFn: () => getCapsuleApi(capsuleId),
    refetchOnWindowFocus: false,
  });
};

export const useCreateCapsule = () => {
  return useMutation({
    mutationFn: createCapsuleApi,
  });
};

export const useDeleteCapsule = () => {
  return useMutation({
    mutationFn: deleteCapsuleApi,
  });
};

export const useUpdateCapsule = () => {
  return useMutation({
    mutationFn: ({
      capsuleId,
      data,
    }: {
      capsuleId: string;
      data: {
        title: string;
        content: string | null;
        image: string | null;
      };
    }) => updateCapsule(capsuleId, data),
  });
};

export const useUpdateShareable = () => {
  return useMutation({
    mutationFn: ({
      capsuleId,
      shareAble,
    }: {
      capsuleId: string;
      shareAble: boolean;
    }) => updateCapsuleSharing(capsuleId, shareAble),
  });
};
