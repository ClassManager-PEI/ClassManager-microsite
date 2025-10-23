export default function HeroSection() {
  return (
    <div className='pt-8'>

      <div className="w-full flex xl:hidden flex-col items-center gap-4 mb-6 lg:mt-0 justify-center z-0 max-h-96">
          <img
          src="https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="drawing"
          className="w-full object-cover team-card group max-h-96"
          />
        </div> 

      <div className="flex flex-col items-center gap-4 mt-6 md:mt-0 mb-8 pt-10">
        <div className='text-2xl container flex flex-row'>
          <div className='w-full xl:w-1/2 flex flex-col justify-center'>
            <div className='text-6xl font-medium'>
              <b>A centralized and automated solution for academic logistics</b>
            </div>
            <div className='mt-2 font-serif md:pr-6 xl:pb-16'>
              <b>ClassManager</b> is a platform to help universities and schools manage the growing complexity of teaching service distribution, room occupation, and scheduling classes. 
            </div>
          </div>
          <div className="hidden xl:flex flex-col items-center gap-4 mt-6 lg:mt-0 justify-center w-1/2 z-0">
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
