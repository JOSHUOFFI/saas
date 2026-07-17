import CompanionCard from "@/components/CompanionCard";
import SearchInput from "@/components/SearchInput";
import SubjectFilters from "@/components/SubjectFilters";
import { getAllCompanion } from "@/lib/actions/companion.action";
import { getSubjectColor } from "@/lib/utils";

//using url search params

const CompanionsLibrary = async({ searchParams }: SearchParams) => {

  const filters = await searchParams;
  const subject = filters.subject ? filters.subject : '';
   const topic = filters.topic ? filters.topic : '';

   //we have the subject, now we can fetch the companions using the server action we created
  const companions = await getAllCompanion({subject, topic});
  console.log(companions);

  
  
 
  return (
   <main>
    <section className="flex justify-between gap-4 max-sm:flex-col"> 
      <h1>Companion Library</h1>
      <div className="flex gap-4">
         < SearchInput/>
         <SubjectFilters/>
      </div>
      </section>
      
      <section className="companions-grid">
        {companions.map((companion) => 
        (<CompanionCard key={companion.id} {...companion} 
          color={getSubjectColor(companion.subject)}
        />
          
        ))}

      

    </section>
   </main>
  )
}

export default CompanionsLibrary
