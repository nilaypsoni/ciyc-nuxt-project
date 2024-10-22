export default function useMediaBaseUrl() {
    const config = useRuntimeConfig();  // Access runtime config

    const MEDIA_BASEURL = `${config.public.apiUrl}uploads/`;

    return {
        MEDIA_BASEURL
    };
}
