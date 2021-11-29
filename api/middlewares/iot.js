const getResults = (id) => {
    const res = await analysisRepository.GetById(id);
    if (res == null){
        return  null;
    }
    return res;
}

