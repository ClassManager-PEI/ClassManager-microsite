export default function HeroSection() {
  return (
    <div className='pt-20'> 

      <div className="flex flex-col items-center gap-4 mt-6 md:mt-0 mb-8">
        <div className='text-2xl w-5/6 flex flex-row'>
          <div className='w-1/2 xs:w-3/4'>
            <div className='text-6xl font-medium'>
              A centralized and automated solution for academic logistics
            </div>
            <div className='mt-2 font-serif'>
              A platform to help universities and schools manage the growing complexity of teaching service distribution, room occupation, and scheduling classes. 
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 mt-6 md:mt-0 justify-center w-1/2 z-0">
            <img
            src="https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="drawing"
            className="w-full object-contain team-card group rounded-4xl"
            />
          </div>
        </div>
      </div>
    
    </div>
  );
}
