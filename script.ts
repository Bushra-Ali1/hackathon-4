// Define types for the form data
interface ResumeData {
    name: string;
    email: string;
    contact: string;
    address: string;
    education: string[];
    workExperience: string;
    skills: string;
}

// Function to handle form submission
document.getElementById('resume-form')!.addEventListener('submit', function(event: Event) {
    event.preventDefault();  // Prevent the form from submitting and refreshing the page

    // Collect the data from the form
    const name = (<HTMLInputElement>document.getElementById('name')).value;
    const email = (<HTMLInputElement>document.getElementById('email')).value;
    const contact = (<HTMLInputElement>document.getElementById('contact')).value;
    const address = (<HTMLInputElement>document.getElementById('address')).value;
    
    const education1 = (<HTMLInputElement>document.getElementById('education1')).value;
    const education2 = (<HTMLInputElement>document.getElementById('education2')).value;
    const education3 = (<HTMLInputElement>document.getElementById('education3')).value;
    const education4 = (<HTMLInputElement>document.getElementById('education4')).value;
    
    const workExperience = (<HTMLTextAreaElement>document.getElementById('work-experience')).value;
    const skills = (<HTMLInputElement>document.getElementById('skills')).value;

    // Create an object to store the collected data
    const resumeData: ResumeData = {
        name,
        email,
        contact,
        address,
        education: [education1, education2, education3, education4],
        workExperience,
        skills
    };

    // Generate the resume content using the collected data
    const resumeHTML = generateResumeHTML(resumeData);

    // Display the generated resume in the #resume-output section
    document.getElementById('resume-output')!.innerHTML = resumeHTML;
    
    // Optionally, make resume editable after generation
    makeEditable();
});

// Function to generate resume HTML content
function generateResumeHTML(data: ResumeData): string {
    return `
        <div class="resume">
            <h1>${data.name}</h1>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Contact:</strong> ${data.contact}</p>
            <p><strong>Address:</strong> ${data.address}</p>
            
            <h3>Education</h3>
            <ul>
                ${data.education.map(edu => `<li>${edu}</li>`).join('')}
            </ul>
            
            <h3>Work Experience</h3>
            <p>${data.workExperience}</p>
            
            <h3>Skills</h3>
            <p>${data.skills}</p>
        </div>
    `;
}

// Function to make resume sections editable
function makeEditable(): void {
    // Select all paragraphs and list items in the generated resume
    const editableElements = document.querySelectorAll('.resume p, .resume li');
    
    // Make these elements editable
    editableElements.forEach(element => {
        (<HTMLElement>element).setAttribute('contenteditable', 'true');
        element.addEventListener('blur', function() {
            // This is where you could save or handle the updated content
            console.log('Updated Content:', (<HTMLElement>element).innerText);
        });
    });
}
