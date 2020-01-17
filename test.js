function func1(){
    func2()
}
function func2(){
    try{
        func3()
    }catch (error){

    }
    func3()
}
function func3(){
    try {
        1/0
    } catch (error) {
        throw error
    }
    return 'success'
}