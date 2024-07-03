import { createClient } from "../../utils/supabase/client";

const RealisationsComponent = async () => {
  const supabase = createClient();


  return (
    <div className='container'>
      <h2 className="mid-title">
        Nos <span className='blue'>Réalisations</span>
      </h2>
    </div>
  );
};

export default RealisationsComponent;
