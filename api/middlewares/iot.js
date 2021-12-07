const getResults = async (id) => {
    const res = await healthParamsRepository.GetById(id);
    if (res == null){
        return  null;
    }
    return res;
}

