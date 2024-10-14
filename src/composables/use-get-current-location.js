

const useGetCurrentLocation = (successCallback,errorCallback) => {
    return navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
}

export default useGetCurrentLocation
