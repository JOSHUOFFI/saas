"use client"; // This tells Next.js that this component runs in the browser.
// We need this because users will interact with the dropdown.

// --------------------
// Import Shadcn Select Components
// --------------------
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Import the array of subjects.Example:
// const subjects = ["Mathematics", "English", "Physics", ...]
import { subjects } from "@/constants";

// Next.js hooks for navigation and reading the current URL.
import { useRouter, useSearchParams } from "next/navigation";

const SubjectFilters = () => {

    // Gives us the ability to change the URL programmatically.Example:
    // router.push("/companions?subject=Math")
    const router = useRouter();

    // Gives us access to the current URL's query parameters.
    // Example URL:
    // /companions?subject=Math&topic=Algebra
    const searchParams = useSearchParams();

    // Read the current "subject" from the URL.
    //
    // If the URL is: /companions?subject=Physics
    //
    // currentSubject = "Physics"
    //
    // If there is NO subject in the URL,
    // searchParams.get() returns null, so we use || "" to make it an empty string.
    const currentSubject = searchParams.get("subject") || "";

    // -------------------------------------------------
    // This function runs EVERY TIME the user selects a different subject from the dropdown.
    // -------------------------------------------------
    const handleSubjectChange = (value: string) => {

        // Create a copy of the current URL parameters.
        //
        // Suppose the URL currently is: /companions?topic=Derivatives
        //
        // params now contains:
        // topic=Derivatives
        //
        // We copy it because we don't want to lose any existing filters when changing the subject.
        const params = new URLSearchParams(searchParams);

        // If the user selects "All Subjects",remove the subject filter completely.
        //
        // Example:
        //BEFORE:  /companions?subject=Math
        //
        // AFTER: /companions
        // Otherwise, update the subject parameter.
        //Example:
        // BEFORE:/companions
        //AFTER:/companions?subject=Physics
        if (value === "all") {
            params.delete("subject");
        }

        else {
            params.set("subject", value);
        }

        // Navigate to the new URL.
        //router.push() changes the URL, which causes the page to reload with the new search parameters.
        //Example: /companions?subject=Physics
        //Then your server component receives:
        //
        // searchParams.subject = "Physics"
        //
        // which is then used to fetch only Physics companions.
        router.push(`/companions?${params.toString()}`);
    };

    // --------------------
    // Render the dropdown
    // --------------------
    return (

        // The Select component.
        //
        // value tells Select which option should currently appear selected.
        //
        // onValueChange tells Select which function to run whenever the user chooses another option.
        <Select
            value={currentSubject}
            onValueChange={handleSubjectChange}
        >

            {/* This is the visible dropdown box */}
            <SelectTrigger className="input capitalize w-56">

                {/* Placeholder shown when nothing is selected */}
                <SelectValue placeholder="All Subjects" />

            </SelectTrigger>

            {/* Dropdown menu */}
            <SelectContent>

                {/* Groups related options together */}
                <SelectGroup>

                    {/* Small heading inside dropdown */}
                    <SelectLabel>Subjects</SelectLabel>

                    {/* Option that removes the filter */}
                    <SelectItem value="all">
                        All Subjects
                    </SelectItem>

                    {/* 
            Loop through every subject.

            Example:
             subjects = [
              "Mathematics",
              "English",
              "Physics"
            ]

            React automatically runs:
            subject = "Mathematics"

            subject = "English"

            subject = "Physics"
          */}
                    {subjects.map((subject) => (

                        <SelectItem

                            // React requires a unique key for every item inside a loop.
                            key={subject}

                            // The value sent to handleSubjectChange()
                            value={subject}

                            className="capitalize"
                        >

                            {/* Text shown to the user */}
                            {subject}

                        </SelectItem>

                    ))}

                </SelectGroup>

            </SelectContent>

        </Select>
    );
};

export default SubjectFilters;