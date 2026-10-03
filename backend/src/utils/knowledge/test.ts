import fs from "fs"
import da from "zod/v4/locales/da.cjs";

async function readFile():Promise<string>{

   return new Promise((res,rej)=>{
     
    let text=fs.readFile("sreeman-1.py","utf-8",(err,data)=>{
      if(err)return rej(err);
      if(!data) return rej({
         success:false,
         message:"no data in the file"
      })
       return res(data)
    })
     let text_3= fs.readFileSync("sreeman.txt","utf8")
      console.log(text_3)
  

    
   })
   
  
}

async function testing(x:Promise<string>) {
   return new Promise((res,rej)=>res(x))
}

readFile().then(async(data)=>{
   let text=await (testing(Promise.resolve(data)))
   console.log(text)
}
).catch(err=>console.log(err))


console.log(testing(readFile()))




