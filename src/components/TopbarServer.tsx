import { createClient } from '@/utils/supabase/server';
import TopbarClient from './TopbarClient';

const TopbarServer = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <TopbarClient user={user} />;
};

export default TopbarServer;
