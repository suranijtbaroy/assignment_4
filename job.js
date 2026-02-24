// Initial Data (Minimum 8 Cards)

let jobs = [
    { id: 1, companyName: "Google", position: "Frontend Dev", location: "Mountain View", type: "Full-time", salary: "$120k", status: "all", description: "Work on the world's most popular search engine and UI components." },
    { id: 2, companyName: "Meta", position: "React Developer", location: "Remote", type: "Full-time", salary: "$110k", status: "all", description: "Build the next generation of social interaction in the Metaverse." },
    { id: 3, companyName: "Amazon", position: "Backend Engineer", location: "Seattle, WA", type: "Contract", salary: "$95k", status: "all", description: "Optimizing cloud infrastructure for global e-commerce delivery systems." },
    { id: 4, companyName: "Netflix", position: "UI Designer", location: "Los Gatos", type: "Hybrid", salary: "$105k", status: "all", description: "Design seamless streaming experiences for millions of users." },
    { id: 5, companyName: "Tesla", position: "Software Engineer", location: "Austin, TX", type: "Full-time", salary: "$130k", status: "all", description: "Writing code for autonomous driving and energy management systems." },
    { id: 6, companyName: "Spotify", position: "Data Analyst", location: "Remote", type: "Part-time", salary: "$60k", status: "all", description: "Analyzing listener habits to improve recommendation algorithms." },
    { id: 7, companyName: "Twitter (X)", position: "DevOps", location: "San Francisco", type: "Full-time", salary: "$115k", status: "all", description: "Ensuring high availability and performance for real-time messaging." },
    { id: 8, companyName: "Microsoft", position: "App Developer", location: "Redmond", type: "Full-time", salary: "$125k", status: "all", description: "Contributing to the growth of cloud-based enterprise solutions." }
];

let currentTab = 'all';

// Render Function (For Ui Display)
function renderJobs() {
    const container = document.getElementById('jobs-container');
    
    // Filter logic
    const filteredJobs = currentTab === 'all' ? jobs : jobs.filter(j => j.status === currentTab);
    
    // Update Dashboard Stats
    document.getElementById('total-count').innerText = jobs.length;
    document.getElementById('interview-count').innerText = jobs.filter(j => j.status === 'interview').length;
    document.getElementById('rejected-count').innerText = jobs.filter(j => j.status === 'rejected').length;
    document.getElementById('tab-count').innerText = filteredJobs.length;

    // No Jobs Available View
    if (filteredJobs.length === 0) {
        container.innerHTML = `
            <div class="flex flex-col items-center justify-center py-20 text-center bg-white rounded-xl border-2 border-dashed border-slate-200">
                <img src="https://cdn-icons-png.flaticon.com/512/7486/7486744.png" class="w-16 mb-4 opacity-20" />
                <h3 class="text-xl font-bold text-slate-400">No Jobs Available</h3>
                <p class="text-slate-400">Currently there are no jobs in ${currentTab} list.</p>
            </div>
        `;
        return;
    }

    // Generate Card HTML
    container.innerHTML = filteredJobs.map(job => `
        <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative group hover:border-blue-300 transition-all">
            <button onclick="deleteJob(${job.id})" class="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors" title="Delete Application">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
            </button>

            <div class="flex justify-between items-start mb-2 pr-8">
                <div>
                    <h3 class="text-lg font-bold">${job.companyName}</h3>
                    <p class="text-sm text-slate-500 font-medium">${job.position} • ${job.location}</p>
                </div>
                <span class="badge badge-outline text-xs uppercase font-bold text-slate-500">${job.type}</span>
            </div>
            
            <p class="text-blue-600 font-bold mb-2">${job.salary}</p>
            <p class="text-sm text-slate-600 mb-5 leading-relaxed">${job.description}</p>
            
            <div class="flex gap-3">
                <button onclick="updateStatus(${job.id}, 'interview')" 
                    class="btn btn-sm px-5 ${job.status === 'interview' ? 'btn-success text-white' : 'btn-outline btn-success hover:text-white'}">
                    Interview
                </button>
                <button onclick="updateStatus(${job.id}, 'rejected')" 
                    class="btn btn-sm px-5 ${job.status === 'rejected' ? 'btn-error text-white' : 'btn-outline btn-error hover:text-white'}">
                    Rejected
                </button>
            </div>
        </div>
    `).join('');
}

// Status Change (Interview/Rejected toggle)
function updateStatus(id, newStatus) {
    jobs = jobs.map(job => {
        if (job.id === id) {
            return { ...job, status: job.status === newStatus ? 'all' : newStatus };
        }
        return job;
    });
    renderJobs();
}

// 4. Delete Logic
function deleteJob(id) {
    if(confirm("Are you sure you want to delete this job?")) {
        jobs = jobs.filter(job => job.id !== id);
        renderJobs();
    }
}

// Tab Switching UI Update
function switchTab(tab) {
    currentTab = tab;
    const tabs = ['all', 'interview', 'rejected'];
    
    tabs.forEach(t => {
        const el = document.getElementById(`tab-${t}`);
        if (t === tab) {
            el.classList.add('bg-white', 'shadow-sm');
            el.classList.remove('text-slate-600');
        } else {
            el.classList.remove('bg-white', 'shadow-sm');
            el.classList.add('text-slate-600');
        }
    });
    renderJobs();
}

// Initial Load
renderJobs();