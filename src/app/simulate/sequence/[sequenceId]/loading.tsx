export default function SequenceLoading() {
    return (
      <div className="container-padded py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            {/* Skeleton for back button */}
            <div className="h-10 w-36 bg-gray-200 rounded-md animate-pulse"></div>
          </div>
          
          <div className="mb-8">
            {/* Skeleton for title and description */}
            <div className="h-10 w-3/4 bg-gray-200 rounded-md animate-pulse mb-3"></div>
            <div className="h-6 w-1/2 bg-gray-200 rounded-md animate-pulse"></div>
          </div>
          
          {/* Skeleton for instruction box */}
          <div className="h-32 bg-blue-50 border border-blue-200 rounded-md mb-8 animate-pulse"></div>
          
          {/* Skeleton for simulator */}
          <div className="flex justify-center">
            <div className="max-w-[320px] w-full">
              <div className="border-[8px] border-black rounded-[2rem] overflow-hidden shadow-xl bg-white h-[600px] animate-pulse">
                <div className="bg-gray-200 h-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }