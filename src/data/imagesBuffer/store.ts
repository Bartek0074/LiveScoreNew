import create from 'zustand';

interface ResourceBufferStoreState {
	resourceBuffer: { [key: string]: any };
}

interface ResourceBufferStoreActions {
	addToBuffer: (url: string, data: any) => void;
	getResourceFromBuffer: (url: string) => any;
}

type ResourceBufferStore = ResourceBufferStoreState &
	ResourceBufferStoreActions;

export const useResourceBufferStore = create<ResourceBufferStore>(
	(set, getState) => ({
		resourceBuffer: {},

		addToBuffer: (url, data) => {
			set((state) => ({
				resourceBuffer: {
					...state.resourceBuffer,
					[url]: data,
				},
			}));
		},
		getResourceFromBuffer: (url) => getState().resourceBuffer[url],
	})
);
