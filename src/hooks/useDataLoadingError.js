import { useState } from "react"

const useDataLoadingError = (initialData, loading = true, error = false) => {
  const [data, setData] = useState(initialData)
  const [loadingState, setLoadingState] = useState(loading)
  const [errorState, setErrorState] = useState(error)

  return [
    {
      get: () => data,
      set: (value) => {
        setData(value)
      },
    },
    {
      get: () => loadingState,
      set: (value) => {
        setLoadingState(value)
      },
    },
    {
      get: () => errorState,
      set: (value) => {
        setErrorState(value)
      },
    },
    () => {
      setLoadingState(true)
      setErrorState(false)
    },
  ]
}
