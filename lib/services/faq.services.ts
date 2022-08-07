import { Faq, FaqWithId } from "lib/types";
import { supabase } from "lib/utils/supabaseClient";

export const getFaqs = async () => {
  const { data } = await supabase
    .from<FaqWithId>("faqs")
    .select("*")
    .order("id");

  return data || [];
};

export const postFaq = async (faq: Faq) => {
  const res = await supabase.from("faqs").insert(faq);
  if (res.error) {
    throw new Error(JSON.stringify(res.error));
  }
  return res;
};

export const updateFaq = async (faq: FaqWithId) => {
  const { title, description, id } = faq;
  const res = await supabase
    .from("faqs")
    .update({ title, description })
    .match({ id });
  if (res.error) {
    throw new Error(JSON.stringify(res.error));
  }
  return res;
};

export const delFaq = async (id: number) => {
  const res = await supabase.from("faqs").delete().match({ id });
  if (res.error) {
    throw new Error(JSON.stringify(res.error));
  }
  return res;
};
