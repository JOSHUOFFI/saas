/* eslint-disable react/jsx-key */
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
// import getSubjectColor from "@/lib/utils"
import Link from "next/link"
import Image from "next/image";
import { getSubjectColor } from '@/lib/utils'


interface CompanionsListProps{
  title: string;
  companions?: Companion[];
  className?: string;
  color: string;
}



const CompanionsList = ({title, companions, className, color}: CompanionsListProps) => {
  return (
    <article className={cn( 'companion-list', className)}>
          <h2 className="text-3xl font-bold">Recent Sessions</h2>

    <Table>
  
  <TableHeader>
    <TableRow>
      <TableHead className="text-lg w-2/3">Lessons</TableHead>
      <TableHead className="text-lg">Subject</TableHead>
      <TableHead className="text-lg text-right">Duration</TableHead>
      
    </TableRow>
  </TableHeader>

  <TableBody>
      {companions?.map(({id, subject, name, topic, duration, color}) =>(
        <TableRow>
          <TableCell>
            <Link href={`/companion/${id}`}>
            <div className="flex items-center gap-2">
              <div className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden">
                <Image src={`/icons/${subject}.svg`}
                alt={subject}
                width={35}
                height={35}
                    style={{ backgroundColor: getSubjectColor(subject) }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xl font-bold">
                    {name}
                </p>
                <p className="text-md">
                    {topic}
                </p>
              </div>

            </div>
            </Link>
          </TableCell>

          <TableCell>
            <div className="subject-badge w-full text-center max-md:hidden">
                {subject}
              </div>
              <div className="flex items-center justify-center rounded-lg w-fit p-2 md:hidden">
                  <Image src={`/icons/${subject}.svg`}
                  alt={subject} 
                  width={21}
                  height={19}
                style={{ backgroundColor: getSubjectColor(subject) }}
                  />
              </div>


          </TableCell>

          <TableCell>
            <div className="flex items-center gap-2 w-full justify-end">
                <p className="text-xl font-semibold">
                  {duration} {""} 
                  <span className="max-md:hidden">
                    mins
                  </span>

                </p>
                <Image src="/icons/clock.svg"
                alt= {duration}
                width={19}
                height={15}
                className="md:hidden"
                />
            </div>
          </TableCell>

        </TableRow>
      ))}
    
  </TableBody>
</Table>
    </article>
  )
}

export default CompanionsList
