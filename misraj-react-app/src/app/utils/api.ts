import { Capsule } from '../types/capsule';
import { axiosInstance } from './axios';

export const getCapsulesApi = async (
  page: number = 1,
  limit: number = 10
): Promise<{ capsules: Capsule[]; totalCount: number }> => {
  try {
    const response = await axiosInstance.get('/capsule', {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  } catch (error: any) {
    return Promise.reject(
      new Error(error.response?.data?.message || 'Failed to fetch capsules')
    );
  }
};

export const getCapsuleApi = async (capsuleId: string): Promise<Capsule> => {
  try {
    const response = await axiosInstance.get(`/capsule/${capsuleId}`);
    return response.data;
  } catch (error: any) {
    return Promise.reject(
      new Error(error.response?.data?.message || 'Failed to fetch capsule')
    );
  }
};

export const createCapsuleApi = async (dto: {
  title: string;
  content: string;
  releaseDate: string;
  image: string;
}): Promise<Capsule> => {
  try {
    const response = await axiosInstance.post('/capsule', dto);
    return response.data;
  } catch (error: any) {
    return Promise.reject(
      new Error(error.response?.data?.message || 'Failed to create capsule')
    );
  }
};

export const deleteCapsuleApi = async (capsuleId: string) => {
  try {
    const response = await axiosInstance.delete(`/capsule/${capsuleId}`);
    return response.data;
  } catch (error: any) {
    return Promise.reject(new Error(error.response?.data?.message));
  }
};

export const updateCapsuleSharing = async (
  capsuleId: string,
  shareAble: boolean
): Promise<Capsule> => {
  try {
    const response = await axiosInstance.patch(`/capsule/${capsuleId}`, {
      shareAble,
    });
    return response.data;
  } catch (error: any) {
    return Promise.reject(new Error(error.response?.data?.message));
  }
};

export const updateCapsule = async (
  capsuleId: string,
  data: {
    title: string;
    content: string | null;
    image: string | null;
  }
): Promise<Capsule> => {
  try {
    const response = await axiosInstance.patch(`/capsule/${capsuleId}`, data);
    return response.data;
  } catch (error: any) {
    return Promise.reject(
      new Error(error.response?.data?.message || 'Failed to update capsule')
    );
  }
};

export const fetchUserProfile = async (token: string) => {
  try {
    const response = await fetch('http://localhost:3000/api/auth/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Unauthorized');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};
