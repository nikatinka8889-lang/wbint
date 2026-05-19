const search = ()=>{
    const inputSearch = document.querySelector('.search-block > input') 
    const btnSearch = document.querySelector('.search-block > button')
    btnSearch.addEventListener('click', ()=>{
        console.log(inputSearch.value)
    })
}
search()