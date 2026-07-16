"use client"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type Resolver } from "react-hook-form"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { SelectTrigger } from "@/components/ui/select"
import { SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { SelectContent } from "@/components/ui/select"
import { SelectItem } from "@/components/ui/select"
import { subjects } from "@/constants/index"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createCompanion } from "@/lib/actions/companion.action"
import { redirect } from "next/navigation"


// form schema used to define our form
const formSchema = z.object({
    name: z.string().min(1, {
        message: "Companion name is required."
    }),
    subject: z.string().min(1, { message: 'Subject is required.' }),
    topic: z.string().min(1, { message: 'Topic is required.' }),
    voice: z.string().min(1, { message: 'Voice is required.' }),
    style: z.string().min(1, { message: 'Style is required.' }),
    //   duration has to be a number
    duration: z.coerce.number().min(1, { message: 'Duration is required.' }),

})

const CompanionForm = () => {
    // default values must match our formschema
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema) as Resolver<z.infer<typeof formSchema>>,
        defaultValues: {
            name: '',
            subject: '',
            topic: '',
            voice: '',
            style: '',
            duration: 15,
        },
    })

    //   Define a submit handler
    const router = useRouter()

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        // Do something with the form values.
        const companion = await createCompanion(values);

        if (companion) {
            router.push(`/companions/${companion.id}`)
        }
        else {
            console.log('Failed to create a companion');
            router.push('/')

        }
    }

    return (
        <Form {...form}>

            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Companion Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter Name..." {...field} className="input" />
                            </FormControl>


                            <FormMessage />
                        </FormItem>

                    )}
                />

                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger className="input capitalize">
                                        <SelectValue placeholder="Select subject" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {/*To map through our subjects */}
                                        {subjects.map((subject) => (
                                            <SelectItem
                                                value={subject}
                                                key={subject}
                                                className="capitalize"
                                            >
                                                {subject}
                                            </SelectItem>

                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>


                            <FormMessage />
                        </FormItem>

                    )}
                />

                <FormField
                    control={form.control}
                    name="topic"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>What should the companion help with?</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Ex. Derivatives & Integral" {...field} className="input" />
                            </FormControl>


                            <FormMessage />
                        </FormItem>

                    )}
                />


                <FormField
                    control={form.control}
                    name="voice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Select Preferred Voice</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger className="input">
                                        <SelectValue placeholder="Select voice" />
                                    </SelectTrigger>
                                    <SelectContent>

                                        <SelectItem value="male">
                                            Male
                                        </SelectItem>

                                        <SelectItem value="female">
                                            Female
                                        </SelectItem>

                                    </SelectContent>
                                </Select>
                            </FormControl>


                            <FormMessage />
                        </FormItem>

                    )}
                />

                <FormField
                    control={form.control}
                    name="style"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Style</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger className="input">
                                        <SelectValue placeholder="Select the style" />
                                    </SelectTrigger>
                                    <SelectContent>

                                        <SelectItem value="formal">
                                            Formal
                                        </SelectItem>

                                        <SelectItem value="casual">
                                            Casual
                                        </SelectItem>

                                    </SelectContent>
                                </Select>
                            </FormControl>


                            <FormMessage />
                        </FormItem>

                    )}
                />


                <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                        <FormItem className="m-5">
                            <FormLabel>Estimated Session Duration in Minutes</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="15" {...field} className="input" />
                            </FormControl>


                            <FormMessage />
                        </FormItem>

                    )}
                />



                <Button className="w-full cursor-pointer " type="submit">Build your Companion</Button>

            </form>
        </Form>
    )


}

export default CompanionForm
