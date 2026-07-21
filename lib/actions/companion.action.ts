"use server";

import { auth } from "@clerk/nextjs/server";

import { createSupabaseClient } from "../supabase";

// first create companion
export const createCompanion = async (formData: CreateCompanion) => {
  const { userId: author } = await auth();

  // Debugging
  // console.log("Author:", author);

  // const token = await getToken();
  // console.log("JWT Token:", token);

  const supabase = await createSupabaseClient();

  const { data, error } = await supabase
    .from("companions")
    .insert({ ...formData, author })
    .select();

  if (error || !data)
    throw new Error(error?.message || "Failed to create a companion");

  return data[0];
};

export const getAllCompanion = async ({
  limit = 10,
  page = 1,
  subject,
  topic,
}: GetAllCompanions) => {
  const supabase = await createSupabaseClient();
  // to mke a connection to our database {fetching it}
  // firt create a query
  let query = supabase.from("companions").select();

  if (subject && topic) {
    query = query
      .ilike("subject", `%${subject}%`)
      .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  } else if (subject) {
    query = query.ilike("subject", `%${subject}%`);
  } else if (topic) {
    query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  }

  //including pagination
  query = query.range((page - 1) * limit, page * limit - 1);

  // once we have the query, we can now fetch from our database based of the query

  const { data: companions, error } = await query;

  if (error) throw new Error(error.message);

  return companions ?? [];
  //"If companions is null or undefined, return an empty array instead."
};

export const getCompanion = async (id: string) => {
  //get access t our supabase
  const supabase = await createSupabaseClient();

  //from supabase, give me everything that equals to the id we aare passing from the params
  const { data, error } = await supabase
    .from("companions")
    .select()
    .eq("id", id);

  if (error) return console.log(error);

  return data[0];
};

//head to companion/id and fetch these details
