document.addEventListener('DOMContentLoaded', function() {
    // Global flags and base value for Other Expense adjustments
    let addCreditFee = false;
    let assistApplied = false;
    let baseOtherExpense = parseFloat(document.getElementById('oe').value) || 0;
    
    // Hardcoded Job Types Data (as an array, same as in com.js)
    const jobTypes = [
        { name: "30 Gallon Gas Water Heater Swap Out", duration: 3, category: "Water Heaters" },
        { name: "30 Gallon Shorty Gas Water Heater Swap out", duration: 3, category: "Water Heaters" },
        { name: "40 Gallon Gas Water Heater Swap out", duration: 3, category: "Water Heaters" },
        { name: "40 Gallon Gas Water Heater installation with misc parts", duration: 3.5, category: "Water Heaters" },
        { name: "40 Gallon Electric Water Heater", duration: 3, category: "Water Heaters" },
        { name: "40 Gallon Shorty Gas Water Heater Swap out", duration: 3, category: "Water Heaters" },
        { name: "40 Gallon Shorty Gas Water Heater installation with misc parts", duration: 3.5, category: "Water Heaters" },
        { name: "40 Gallon POWER VENT", duration: 3, category: "Water Heaters" },
        { name: "50 Gallon Gas Water Heater Swap out", duration: 3, category: "Water Heaters" },
        { name: "50 Gallon Gas Water Heater Installation with misc. parts", duration: 3.5, category: "Water Heaters" },
        { name: "50 Gallon Shorty Gas Water Heater Swap out", duration: 3, category: "Water Heaters" },
        { name: "50 Gallon Shorty Gas Water Heater Installation with misc. parts", duration: 3.5, category: "Water Heaters" },
        { name: "50gallon POWER VENT", duration: 3, category: "Water Heaters" },
        { name: "75 Gallon Gas Water Heater Swap Out", duration: 4, category: "Water Heaters" },
        { name: "75 Gallon Gas Water Heater installation with misc parts", duration: 5, category: "Water Heaters" },
        { name: "100 Gallon Gas Water Heater Swap out", duration: 6, category: "Water Heaters" },
        { name: "100 Gallon Gas Water Heater Installation with misc parts (Residential)", duration: 6, category: "Water Heaters" },
        { name: "Swap Out Tankless Water Heater (RSC 199)", duration: 4.5, category: "Tankless" },
        { name: "Install New Tankless Water Heater (Indoor)", duration: 8, category: "Tankless" },
        { name: "Install New Tankless Water Heater (Outdoor)", duration: 8, category: "Tankless" },
        { name: "Descale and Flush Tankless Water Heater", duration: 1, category: "Tankless" },
        { name: "Diagnostic for Tankless Water Heater", duration: 1, category: "Tankless" },
        { name: "Neutralizer Kit", duration: 1, category: "Tankless" },
        { name: "Expansion Tank", duration: 1, category: "Tankless" },
        { name: "Sediment Filter", duration: 1, category: "Tankless" },
        { name: "Run T&P to exterior", duration: 1.5, category: "Water Heaters" },
        { name: "Water Heater Gas Cock Valve", duration: 1, category: "Water Heaters" },
        { name: "Pilot Assembly", duration: 1, category: "Water Heaters" },
        { name: "Ball Valve for Water Heater", duration: 1, category: "Water Heaters" },
        { name: "Control Valve Replacement (Out of Warranty)", duration: 1, category: "Water Heaters" },
        { name: "Recirculating Pump", duration: 1.5, category: "Water Heaters" },
        { name: "Water heater pan swap", duration: 1, category: "Water Heaters" },
        { name: "Premium 50 Gallon Gas American Standard 12 Year Warranty Water Heater Swap out", duration: 3, category: "Water Heaters" },
        { name: "Premium 50 Gallon Gas American Standard Shorebird 12 Year Warranty Water Heater Swap out", duration: 6, category: "Water Heaters" },
        { name: "Burner Assembly", duration: 1, category: "Water Heaters" },
        { name: "Replace T&P", duration: 1, category: "Water Heaters" },
        // DRAIN & SEWER
        { name: "Bathtub/ Shower Clog", duration: 1, category: "Drain" },
        { name: "Kitchen Sink back-up - ACCESSIBLE CLEAN OUT", duration: 1, category: "Drain" },
        { name: "Kitchen Sink back-up - SNAKE UNDER SINK", duration: 1.25, category: "Drain" },
        { name: "Lavatory/ Bathroom sink", duration: 1, category: "Drain" },
        { name: "Snake and Jet 2\" Kitchen Branch drain from accessible clean out", duration: 2, category: "Drain" },
        { name: "Toilet removal to snake", duration: 1.5, category: "Drain" },
        { name: "Utility/ Garage Sink", duration: 1, category: "Drain" },
        { name: "Floor Drain (Commercial)", duration: 1, category: "Drain" },
        { name: "Laundry/ Secondary Drain Line", duration: 1, category: "Drain" },
        { name: "Toilet Clog or Auger Toilet", duration: 1, category: "Drain" },
        { name: "Bar Sink", duration: 1, category: "Drain" },
        { name: "Commercial Floor Sink Stoppage", duration: 1.5, category: "Drain" },
        { name: "Pedestal Lavy Sink Clog Remove Trap", duration: 1.5, category: "Drain" },
        { name: "Video Camera Inspection of Sewer from Accessible Clean Out", duration: 1, category: "Drain" },
        { name: "Video Inspection From Pulled Toilet", duration: 1.5, category: "Drain" },
        { name: "Hydro Jet Drain Line", duration: 2, category: "Drain" },
        { name: "Jetter  Scheduled Maintenance", duration: 2, category: "Drain" },
        { name: "Snake Main Line from accessible clean out", duration: 1, category: "Drain" },
        // FAUCETS / KITCHEN / MISC
        { name: "Deck mount faucet", duration: 1.25, category: "Faucet/Kitchen" },
        { name: "P-Trap (ABS Sch 40)", duration: 1, category: "Faucet/Kitchen" },
        { name: "Wash Machine Hoses", duration: 1, category: "Faucet/Kitchen" },
        { name: "Wash Machine Valves Hot & Cold", duration: 1.25, category: "Faucet/Kitchen" },
        { name: "Washer Box", duration: 4, category: "Faucet/Kitchen" },
        { name: "Wall Mount Faucet for the laundry", duration: 1.25, category: "Faucet/Kitchen" },
        { name: "1 HP Garbage Disposal (Badger 5)", duration: 1.5, category: "Faucet/Kitchen" },
        { name: "3/4 HP garbage Disposal (Badger 5)", duration: 1, category: "Faucet/Kitchen" },
        { name: "1/2 HP Garbage Disposal (Badger 5)", duration: 1, category: "Faucet/Kitchen" },
        { name: "Air Gap", duration: 1, category: "Faucet/Kitchen" },
        { name: "All Sink Drains/ Brass", duration: 2, category: "Faucet/Kitchen" },
        { name: "All Sink Drains/ ABS", duration: 1.5, category: "Faucet/Kitchen" },
        { name: "Basket Strainer", duration: 1, category: "Faucet/Kitchen" },
        { name: "Extension Tailpiece", duration: 1, category: "Faucet/Kitchen" },
        { name: "Flange Tail", duration: 1, category: "Faucet/Kitchen" },
        { name: "Ice Maker Refrigerator Supply", duration: 1, category: "Faucet/Kitchen" },
        { name: "Insta Hot Standard Model", duration: 1.5, category: "Faucet/Kitchen" },
        { name: "Owner Supplied Garbage Disposal", duration: 1, category: "Faucet/Kitchen" },
        { name: "Rebuild Delta", duration: 1.5, category: "Faucet/Kitchen" },
        { name: "Rebuild Pfister", duration: 1.5, category: "Faucet/Kitchen" },
        { name: "Shut Off Valve Hot & Cold (dual angle stop)", duration: 1, category: "Faucet/Kitchen" },
        { name: "Kitchen Sink faucet repalcement", duration: 1.5, category: "Faucet/Kitchen" },
        { name: "Supply Lines Hot & Cold", duration: 1, category: "Faucet/Kitchen" },
        { name: "Install 1 1/2\" Plastic P Trap", duration: 1, category: "Faucet/Kitchen" },
        { name: "Clear & Reset Jammed Disposal", duration: 1, category: "Faucet/Kitchen" },
        { name: "Install 1 1/2\"  P Trap BRASS", duration: 1, category: "Faucet/Kitchen" },
        { name: "Customer Provided Kitchen Sink Faucet Replacement", duration: 1.25, category: "Faucet/Kitchen" },
        { name: "Kitchen 2\" Re-Drain upto 20'", duration: 5, category: "Faucet/Kitchen" },
        { name: "Wall Mount Faucet for the kitchen", duration: 1.5, category: "Faucet/Kitchen" },
        { name: "Angle Stop Shut Off Valve- Replace all in home (Up to 12)", duration: 3, category: "Faucet/Kitchen" },
        { name: "2 Handle (4\" Spread)", duration: 1.25, category: "Faucet/Kitchen" },
        { name: "Center Set (Single Hole Faucet) (with sprayer)", duration: 1.25, category: "Faucet/Kitchen" },
        { name: "Owner Supplied Faucet (4\" or single hole)", duration: 1, category: "Faucet/Kitchen" },
        { name: "Owner Supplied Faucet (wide spread)", duration: 1.5, category: "Faucet/Kitchen" },
        { name: "P - Trap", duration: 1.25, category: "Faucet/Kitchen" },
        { name: "Pop- Up Assembly", duration: 1.25, category: "Faucet/Kitchen" },
        { name: "Angle Stop Shut Off Valve", duration: 1, category: "Faucet/Kitchen" },
        { name: "Angle Stop Shut off Valve Hot & Cold", duration: 1, category: "Faucet/Kitchen" },
        { name: "Single Handle (4\" Spread)", duration: 1.25, category: "Faucet/Kitchen" },
        { name: "Supply Line", duration: 1, category: "Faucet/Kitchen" },
        { name: "Supply Lines (Hot & Cold)", duration: 1, category: "Faucet/Kitchen" },
        { name: "Threaded Tailpiece", duration: 1, category: "Faucet/Kitchen" },
        { name: "Wide Spread", duration: 1.5, category: "Faucet/Kitchen" },
        // SHOWER / TUB
        { name: "Install Shower Valve", duration: 3, category: "Shower/Tub" },
        { name: "Shower Head Provide and Install", duration: 1, category: "Shower/Tub" },
        { name: "Owner supplied Shower Valve", duration: 3, category: "Shower/Tub" },
        { name: "Tub Spout", duration: 1, category: "Shower/Tub" },
        { name: "Waste and Overflow Replacement from Crawl Space", duration: 2, category: "Shower/Tub" },
        { name: "Waste and Overflow Replacement from Ceiling", duration: 2, category: "Shower/Tub" },
        { name: "Shower Cartridge Replacement (Delta, Moen or Common only)", duration: 1, category: "Shower/Tub" },
        // TOILET / URINAL
        { name: "Fill Valve and Supply Line", duration: 1, category: "Toilet" },
        { name: "Toilet Tank / Flapper", duration: 1, category: "Toilet" },
        { name: "Flush Valve", duration: 1, category: "Toilet" },
        { name: "Toilet Handle", duration: 1, category: "Toilet" },
        { name: "Pressure Assist Toilet Rebuild", duration: 2, category: "Toilet" },
        { name: "Angle Stop Shut Off Valve", duration: 1, category: "Toilet" },
        { name: "Supply Line", duration: 1, category: "Toilet" },
        { name: "Tall/ Elongated (ADA) 2 Piece (Kohler)", duration: 1, category: "Toilet" },
        { name: "Standard 2 piece (gravity flush) toilet", duration: 1, category: "Toilet" },
        { name: "Remove Object from Toilet", duration: 1.25, category: "Toilet" },
        { name: "Urinal Stoppage Through Urinal", duration: 1.5, category: "Toilet" },
        { name: "Urinal Stoppage Remove and Clear", duration: 2, category: "Toilet" },
        { name: "Install Toto ADA Ultramax", duration: 1, category: "Toilet" },
        { name: "Replace Toilet Wax Seal and bolts", duration: 1, category: "Toilet" },
        { name: "Toilet Clog/ Backup", duration: 1, category: "Toilet" },
        { name: "Angle Stop Shut Off Valve/ Replacement for all angle stops in home (up to 12)", duration: 3, category: "Toilet" },
        { name: "Customer-supplied Standard 2 piece toilet", duration: 1, category: "Toilet" },
        { name: "Owner supplied Shower Head", duration: 1, category: "Toilet" },
        // SUMP PUMP
        { name: "Standard Storm Water Sump Pump Swap", duration: 2.5, category: "Sump Pump" },
        { name: "110V Back Up Alarm System for Submergible Sump Pump (Swap)", duration: 2, category: "Sump Pump" },
        { name: "Sewer Sump Pump Swap", duration: 2.5, category: "Sump Pump" },
        // GAS
        { name: "Gas Repair Minimum Charge (without permits or city inspection)", duration: 1.5, category: "Gas" },
        { name: "Install Earthquake Valve 3/4\"", duration: 1.5, category: "Gas" },
        { name: "Install Earthquake Valve 1\"", duration: 1.5, category: "Gas" },
        { name: "Install Earthquake Valve 1 1/4\"", duration: 2, category: "Gas" },
        { name: "Gas Line Pressure Test (no reprairs and no permits)", duration: 1, category: "Gas" },
        // CLEAN OUTS
        { name: "Clean Out 2Way - Standard", duration: 4.5, category: "Clean Outs" },
        { name: "Clean Out 2Way", duration: 4.5, category: "Clean Outs" },
        { name: "Property Line Clean Out - West Bay", duration: 6, category: "Clean Outs" },
        { name: "Property Line Clean Out - Standard", duration: 5, category: "Clean Outs" },
        // LINE LOCATION
        { name: "Line Location from Clean Out (upto 100')", duration: 1, category: "Line Location" },
        { name: "Line Location from Clean Out (more than 100')", duration: 1, category: "Line Location" },
        // PRESSURE / VALVES
        { name: "Pressure Regulating Valve (up to 1\")", duration: 2, category: "Valves" },
        { name: "Replace Ball Valve for Water Main", duration: 2, category: "Valves" }
    ];
    
    // Global variables for dynamic question answers and filtered options
    let paymentReceived = "";
    let paymentMethod = "";
    let creditCardFeeAnswer = "";
    let originalJobTypeOptions = [];
    
    const technicianRates = {
        'Brian Solis': 25,
        'Bryan Magańa': 60,
        'Edvin Garcia': 30,
        'Jesus Escalante': 40,
        'Jose Rodriguez (Chepe)': 26,
        'Ryan Felt': 50,
        'Walter Calderon': 50,
        'Kevin Stoumbaugh': 45,
    };
    
    const technicianCheckboxes = document.querySelectorAll('input[name="technicians"]');
    const HourlyRateInput = document.getElementById('rate');
    const projectDurationInput = document.getElementById('pd');
    const printButton = document.getElementById('printButton');
    const totalPriceInput = document.getElementById('tp');
    const assistToggleBtn = document.getElementById('assistToggle');
    const otherExpenseField = document.getElementById('oe');
    
    // Technician Grid Formatting
    const techniciansContainer = document.getElementById('technicians');
    if (techniciansContainer) {
        techniciansContainer.style.display = 'grid';
        techniciansContainer.style.gridTemplateColumns = 'repeat(auto-fit, minmax(150px, 1fr))';
        techniciansContainer.style.gap = '10px';
        const brElements = techniciansContainer.querySelectorAll('br');
        brElements.forEach(br => br.remove());
    }
    
    // Show dynamic questions section
    const questionSection = document.querySelector('.question-section');
    if (questionSection) {
        questionSection.style.display = 'block';
    }
    
    // ----------------- Dynamic Questions Functions (Integrated) -----------------
    function handleAnswer(answer, questionNumber) {
        if (questionNumber === 1) {
            if (answer === 'yes') {
                paymentReceived = "Yes";
                document.getElementById('question1').style.display = 'none';
                document.getElementById('question2').style.display = 'block';
            } else if (answer === 'no') {
                paymentReceived = "No";
                document.getElementById('question1').style.display = 'none';
                document.getElementById('question2').style.display = 'none';
                document.getElementById('question3').style.display = 'none';
                document.getElementById('questionCheck').style.display = 'none';
            } else if (answer === 'account') {
                paymentReceived = "BAYSHORE ACCOUNT";
                document.getElementById('question1').style.display = 'none';
                document.getElementById('question2').style.display = 'none';
                document.getElementById('question3').style.display = 'none';
                document.getElementById('questionCheck').style.display = 'none';
            }
        } else if (questionNumber === 2) {
            if (answer === 'creditCard') {
                paymentMethod = "Credit Card";
                document.getElementById('question2').style.display = 'none';
                document.getElementById('question3').style.display = 'block';
                document.getElementById('questionCheck').style.display = 'none';
            } else if (answer === 'Debit' || answer === 'cash' || answer === 'online') {
                if (answer === 'Debit') {
                    paymentMethod = "Debit Card";
                } else if (answer === 'cash') {
                    paymentMethod = "Cash";
                } else {
                    paymentMethod = "Online";
                }
                document.getElementById('question2').style.display = 'none';
                document.getElementById('question3').style.display = 'none';
                document.getElementById('questionCheck').style.display = 'none';
            } else if (answer === 'check') {
                paymentMethod = "Check";
                document.getElementById('question2').style.display = 'none';
                // Show the check number input field
                document.getElementById('questionCheck').style.display = 'block';
            } else if (answer === 'account') {
                paymentMethod = "Account";
                document.getElementById('question2').style.display = 'none';
                document.getElementById('question3').style.display = 'none';
                document.getElementById('questionCheck').style.display = 'none';
            }
        } else if (questionNumber === 3) {
            document.getElementById('question3').style.display = 'none';
            if (answer === 'no') {
                addCreditFee = true;
                creditCardFeeAnswer = "Not Added (automatic fee applied)";
            } else {
                addCreditFee = false;
                creditCardFeeAnswer = "Yes (fee already added)";
            }
            updateOtherExpense();
            calculateKicker();
        }
    }
    
    window.handleAnswer = handleAnswer;
    // ----------------- End Dynamic Questions Functions -----------------
    
    technicianCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateHourlyRate);
    });
    
    function updateHourlyRate() {
        let totalRate = 0;
        technicianCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                totalRate += technicianRates[checkbox.value] || 0;
            }
        });
        HourlyRateInput.value = totalRate;
    }
    
    document.getElementById('oe').addEventListener('change', function() {
        baseOtherExpense = parseFloat(this.value) || 0;
        updateOtherExpense();
        calculateKicker();
    });
    
    function updateOtherExpense() {
        const tp = parseFloat(totalPriceInput.value) || 0;
        const ccFee = addCreditFee ? (0.03 * tp) : 0;
        const assistFee = assistApplied ? (0.10 * tp) : 0;
        let newOE = baseOtherExpense + ccFee + assistFee;
        otherExpenseField.value = newOE.toFixed(2);
    }
    
    // Merge the two existing project duration validation functions into one:
    function adjustProjectDuration() {
        let duration = parseFloat(projectDurationInput.value);
        if (isNaN(duration) || duration < 1) {
            alert("Project Duration must be at least 1 hour.");
            projectDurationInput.value = "1";
        } else {
            // Apply specific increment logic first:
            if (duration >= 1.1 && duration <= 1.49) {
                projectDurationInput.value = 1.5;
            } else if (duration >= 1.51 && duration <= 1.99) {
                projectDurationInput.value = 2;
            } else if (duration >= 2.1 && duration <= 2.49) {
                projectDurationInput.value = 2.5;
            } else if (duration >= 2.51 && duration <= 2.99) {
                projectDurationInput.value = 3;
            } else {
                // Otherwise, round to the nearest quarter hour:
                let rounded = Math.round(duration * 4) / 4;
                projectDurationInput.value = rounded;
            }
        }
    }
    // Attach the merged event listener only once.
    projectDurationInput.addEventListener("change", adjustProjectDuration);
    
    assistToggleBtn.addEventListener('click', function() {
        const tp = parseFloat(totalPriceInput.value) || 0;
        if (assistApplied) {
            assistApplied = false;
            assistToggleBtn.classList.remove('green-button');
            assistToggleBtn.classList.add('red-button');
            assistToggleBtn.textContent = 'NON ASSISTED SALE';
        } else {
            assistApplied = true;
            assistToggleBtn.classList.remove('red-button');
            assistToggleBtn.classList.add('green-button');
            assistToggleBtn.textContent = 'ASSISTED SALE';
        }
        updateOtherExpense();
        calculateKicker();
    });
    
    // --- Cascading Job Category and Job Type Functions (Copied from com.js) ---
    function populateJobCategories() {
        const jobCategorySelect = document.getElementById("jobCategorySelect");
        jobCategorySelect.innerHTML = '<option value="">-- Select a Job Category --</option>';
        const categoriesSet = new Set();
        jobTypes.forEach(job => {
            if (job.category) {
                categoriesSet.add(job.category);
            }
        });
        let categories = Array.from(categoriesSet);
        categories.sort();
        categories.unshift("CUSTOM");
        categories.forEach(category => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            jobCategorySelect.appendChild(option);
        });
    }
    
    function populateJobTypesByCategory(category) {
        const jobTypeSelect = document.getElementById("jobTypeSelect");
        jobTypeSelect.innerHTML = '<option value="">-- Select a Job Type --</option>';
        originalJobTypeOptions = [];
        if (category === "CUSTOM") {
            const option = document.createElement("option");
            option.value = "Custom Job Type";
            option.textContent = "Custom Job Type";
            jobTypeSelect.appendChild(option);
            originalJobTypeOptions.push(option);
        } else {
            const filteredJobs = jobTypes.filter(job => job.category === category);
            filteredJobs.forEach(job => {
                const option = document.createElement("option");
                option.value = job.name;
                option.textContent = job.name;
                option.dataset.duration = job.duration;
                jobTypeSelect.appendChild(option);
                originalJobTypeOptions.push(option);
            });
        }
    }
    
    function filterJobTypes() {
        const searchQuery = document.getElementById("jobTypeSearch").value.toLowerCase();
        const jobTypeSelect = document.getElementById("jobTypeSelect");
        jobTypeSelect.innerHTML = '<option value="">-- Select a Job Type --</option>';
        originalJobTypeOptions.forEach(option => {
            if (option.textContent.toLowerCase().includes(searchQuery)) {
                const newOption = option.cloneNode(true);
                jobTypeSelect.appendChild(newOption);
            }
        });
    }
    
    document.getElementById("jobCategorySelect").addEventListener("change", function() {
        const selectedCategory = this.value;
        if (selectedCategory) {
            populateJobTypesByCategory(selectedCategory);
            document.getElementById("jobTypeRow").style.display = 'block';
            document.getElementById("jobTypeSearchRow").style.display = 'block';
            document.getElementById("jobTypeSearch").value = "";
        } else {
            document.getElementById("jobTypeRow").style.display = 'none';
            document.getElementById("jobTypeSearchRow").style.display = 'none';
        }
    });
    document.getElementById("jobTypeSearch").addEventListener("input", filterJobTypes);
    
    populateJobCategories();
    
    // --- Print Functionality ---
    printButton.addEventListener('click', function(event) {
        event.preventDefault();
        if (!confirm("I HEREBY CONFIRM THAT ALL THE CONTENTS OF THIS DOCUMENT ARE CORRECT AND I TAKE FULL RESPONSIBILITY FOR THIS DOCUMENT.")) {
            return;
        }
        var printWindow = window.open('', '_blank', 'width=800,height=1123');
        if (!printWindow) {
            alert("Popup blocked! Please allow popups for this site.");
            return;
        }
        printContent(printWindow);
    });
    
    function printContent(printWindow) {
        const fullPath = window.location.href;
        const baseUrl = fullPath.substring(0, fullPath.lastIndexOf('/') + 1);
    
        const technicianNames = Array.from(document.querySelectorAll('input[name="technicians"]:checked'))
            .map(tech => tech.value).join(', ');
        const notes = document.getElementById('notes').value;
        const invoiceNumber = document.getElementById('in').value;
        const jobCategory = document.getElementById('jobCategorySelect').value;
        const jobTypeSelect = document.getElementById('jobTypeSelect');
        const jobType = jobTypeSelect.options[jobTypeSelect.selectedIndex] ? jobTypeSelect.options[jobTypeSelect.selectedIndex].text : "";
        const jobAddress = document.getElementById('ja').value;
        const date = document.getElementById('date').value;
        const totalPrice = document.getElementById('tp').value;
        const materialExpenses = document.getElementById('material').value;
        const oe = document.getElementById('oe').value;
        const projectHours = document.getElementById('pd').value;
        const day1 = document.getElementById('day1').value;
        const day2 = document.getElementById('day2').value;
        const day3 = document.getElementById('day3').value;
        const day4 = document.getElementById('day4').value;
        const day5 = document.getElementById('day5').value;
        const additionalHours = document.getElementById('ah').value;
        const overtimeHours = document.getElementById('toh').value;
        const totalHours = document.getElementById('totalHours').value;
        const sw = document.getElementById('sw').value;
        const wh = document.getElementById('wh').value;
        const rd = document.getElementById('rd').value;
        const bpp = document.getElementById('bpp').value;
        const kicker = document.getElementById('kicker').textContent;
        const saleType = assistToggleBtn.innerText;
    
        let additionalRow = "";
        if (paymentReceived === "No" || paymentReceived === "BAYSHORE ACCOUNT") {
            additionalRow = `<tr><th>Payment Received:</th><td>${paymentReceived}</td></tr>`;
        } else if (paymentMethod === "Check") {
            const checkNumber = document.getElementById('checkNumber').value || "N/A";
            additionalRow = `<tr><th>Payment Received:</th><td>${paymentReceived}</td></tr>
                             <tr><th>Payment Method:</th><td>${paymentMethod}</td></tr>
                             <tr><th>Check Number:</th><td>${checkNumber}</td></tr>`;
        } else if (paymentMethod === "Credit Card") {
            additionalRow = `<tr><th>Payment Received:</th><td>${paymentReceived}</td></tr>
                             <tr><th>Payment Method:</th><td>${paymentMethod}</td></tr>
                             <tr><th>Credit Card Fee Added:</th><td>${creditCardFeeAnswer}</td></tr>`;
        } else {
            additionalRow = `<tr><th>Payment Received:</th><td>${paymentReceived}</td></tr>
                             <tr><th>Payment Method:</th><td>${paymentMethod}</td></tr>`;
        }
    
        const questionsSection = `
          <h3>QUESTIONS & ANSWERS:</h3>
          <table class="input-data">
            ${additionalRow}
          </table>
        `;
    
        let htmlContent = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <title>TECHNICIAN PAYROLL DOCUMENT</title>
            <link rel="stylesheet" href="${baseUrl}payrollprint.css" type="text/css" media="print">
          </head>
          <body>
            <div class="top-bar">
              <div class="logo-container">
                <img src="BP.png" alt="BP logo" class="logo">
              </div>
              <h1>TECHNICIAN PAYROLL DOCUMENT</h1>
            </div>
            <div class="container">
              <div class="no-break">
                <div class="details-section">
                  <h3>DETAILS:</h3>
                  <table class="input-data">
                    <tr><th>Technicians' Names:</th><td>${technicianNames}</td></tr>
                    <tr><th>Sale Type:</th><td>${saleType}</td></tr>
                    <tr><th>Job Address:</th><td>${jobAddress}</td></tr>
                    <tr><th>Invoice Number:</th><td>${invoiceNumber}</td></tr>
                    <tr><th>Date:</th><td>${date}</td></tr>
                    <tr><th>Job Category:</th><td>${jobCategory}</td></tr>
                    <tr><th>Job Type:</th><td>${jobType}</td></tr>
                    <tr><th>Project Hours:</th><td>${projectHours} Hours</td></tr>
                    <tr><th>Material Expenses:</th><td>$${materialExpenses}</td></tr>
                    <tr><th>Other Expenses:</th><td>$${oe}</td></tr>
                    <tr><th>Total Price:</th><td>$${totalPrice}</td></tr>
                    <tr><th>Job Description/Notes:</th><td>${notes}</td></tr>
                  </table>
                </div>
              </div>
              ${questionsSection}
              <div class="no-break">
                <h3>LABOR DETAILS:</h3>
                <table class="input-data">
                  <tr><th>Day 1</th><th>Day 2</th><th>Day 3</th><th>Day 4</th></tr>
                  <tr>
                    <td>${day1}</td>
                    <td>${day2}</td>
                    <td>${day3}</td>
                    <td>${day4}</td>
                  </tr>
                </table>
                <table class="input-data">
                  <tr><th>Day 5</th><th>Additional Hours</th><th>Total Overtime Hours</th><th>Total Hours</th></tr>
                  <tr>
                    <td>${day5}</td>
                    <td>${additionalHours}</td>
                    <td>${overtimeHours}</td>
                    <td>${totalHours}</td>
                  </tr>
                </table>
                <h3>FOR OFFICE USE ONLY:</h3>
              </div>
              <table class="input-data">
                <tr><th>SW21/RP21</th><th>WH32</th><th>RD15/UL15</th><th>BPP%</th></tr>
                <tr>
                  <td>${document.getElementById('sw').value}</td>
                  <td>${document.getElementById('wh').value}</td>
                  <td>${document.getElementById('rd').value}</td>
                  <td>${document.getElementById('bpp').value}</td>
                </tr>
              </table>
              <div class="commission-details-section">
                <h3>KICKER DETAILS:</h3>
                <table class="input-data">
                  <tr><th>Kicker:</th><td>${document.getElementById('kicker').textContent}</td></tr>
                </table>
              </div>
            </div>
          </body>
          </html>
        `;
    
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    }
    // ----------------- End Print Functionality -----------------
    
    function debounce(func, delay) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }
    
    // ------------- Updated Kicker Calculation Logic -------------
    function calculateKicker() {
        let totalPrice = parseFloat(document.getElementById('tp').value) || 0;
        let materialExpenses = parseFloat(document.getElementById('material').value) || 0;
        let otherExpenses = parseFloat(document.getElementById('oe').value) || 0;
        let pd = parseFloat(document.getElementById('pd').value) || 0;
    
        let day1 = parseFloat(document.getElementById('day1').value) || 0;
        let day2 = parseFloat(document.getElementById('day2').value) || 0;
        let day3 = parseFloat(document.getElementById('day3').value) || 0;
        let day4 = parseFloat(document.getElementById('day4').value) || 0;
        let day5 = parseFloat(document.getElementById('day5').value) || 0;
        let additionalHours = parseFloat(document.getElementById('ah').value) || 0;
        let overtimeHours = parseFloat(document.getElementById('toh').value) || 0;
    
        let totalHours = day1 + day2 + day3 + day4 + day5 + additionalHours + (1.5 * overtimeHours);
        document.getElementById('totalHours').value = totalHours.toFixed(2);
    
        let hourlyRate = parseFloat(HourlyRateInput.value) || 0;
        const grossAmount = totalPrice - (materialExpenses * 1.2) - (totalHours * 75) - otherExpenses;
        const baseCommission = hourlyRate * pd;
        let grossProfit = grossAmount - baseCommission;
        const overheads = pd * 246;
        let profit = grossProfit - overheads + (materialExpenses * 1.2 * 0.1667) + (totalHours * 75 * 0.4);
    
        // Calculate profit percentage after technician salaries are subtracted
        const selectedTechnicians = document.querySelectorAll('input[name="technicians"]:checked');
        const numTechnicians = selectedTechnicians.length;
    
        if (numTechnicians > 0) {
            const totalSalary = hourlyRate * pd * numTechnicians;
            profit = totalPrice - (materialExpenses * 1.2) - (totalHours * 75) - otherExpenses - totalSalary - overheads + (materialExpenses * 1.2 * 0.1667) + (totalHours * 75 * 0.4);
            let profper = totalPrice !== 0 ? ((profit / totalPrice) * 100).toFixed(2) : '0.00';
    
            // --- Apply Kicker Conditions ---
            const jobTypeElement = document.getElementById('jobType');
            const selectedJobTypeCode = jobTypeElement ? jobTypeElement.value : "";
            let noKicker = false;
            if (parseFloat(profper) < 10) {
                noKicker = true;
            }
            // Removed the pd===1 check so that even 1 hour projects get a kicker if standard time > 1
            if (selectedJobTypeCode && jobTypes[selectedJobTypeCode]) {
                const std = jobTypes[selectedJobTypeCode].standardTime;
                // Rule 3: If standard time is 1 hour or less, no kicker.
                if (typeof std === "number") {
                    if (std <= 1) {
                        noKicker = true;
                    }
                    // Rule 5: Kicker valid only if project duration is less than standard time.
                    else if (pd >= std) {
                        noKicker = true;
                    }
                }
            }
    
            let kicker = 0;
            if (!noKicker) {
                if (profper >= 35.01 && profper <= 39.99) {
                    kicker = 0.015 * totalPrice;
                } else if (profper >= 40.01 && profper <= 49.99) {
                    kicker = 0.02 * totalPrice;
                } else if (profper >= 50.01 && profper <= 59.99) {
                    kicker = 0.025 * totalPrice;
                } else if (profper >= 60.01) {
                    kicker = 0.03 * totalPrice;
                }
            }
    
            let kickerDisplay = '';
            if (numTechnicians === 1) {
                // Single technician: just show the dollar amount
                kickerDisplay = `$${kicker.toFixed(2)}`;
            } else {
                // Multiple technicians: "Total: $..." plus the breakdown
                kickerDisplay = `Total: $${kicker.toFixed(2)}`;
                const kickerPerTechnician = kicker / numTechnicians;
                selectedTechnicians.forEach((tech, index) => {
                    kickerDisplay += `, $${kickerPerTechnician.toFixed(2)}`;
                });
            }
            document.getElementById('kicker').textContent = kickerDisplay;
    
            profit -= kicker;
            let nprofit = profit;
            let nprofper = totalPrice !== 0 ? ((nprofit / totalPrice) * 100).toFixed(2) : '0.00';
    
            const sw = ((materialExpenses) / totalPrice) * 100 || 0;
            const wh = sw;
            const rd = sw;
    
            let bppValue = '';
            if (parseFloat(nprofper) < 10) {
                bppValue = `👎: JOB BUST. Please see GM`;
            } else if (parseFloat(nprofper) >= 10 && parseFloat(nprofper) <= 19.99) {
                bppValue = `😬: MARGINAL PROFIT`;
            } else if (parseFloat(nprofper) >= 20 && parseFloat(nprofper) <= 29.99) {
                bppValue = `👍: GOOD Work`;
            } else if (parseFloat(nprofper) >= 30 && parseFloat(nprofper) <= 39.99) {
                bppValue = `😀: NICE WORK`;
            } else if (parseFloat(nprofper) >= 40 && parseFloat(nprofper) <= 59.99) {
                bppValue = `⭐: GREAT WORK`;
            } else {
                bppValue = `🌟: EXCELLENT WORK`;
            }
            document.getElementById('bpp').value = bppValue;
            document.getElementById('sw').value = sw.toFixed(2);
            document.getElementById('wh').value = wh.toFixed(2);
            document.getElementById('rd').value = rd.toFixed(2);
    
            if (parseFloat(nprofper) < 10) {
                document.getElementById("jobBustMessage").textContent = "RESULT: JOB BUST";
            } else {
                document.getElementById("jobBustMessage").textContent = "";
            }
        } else {
            alert('Please select at least one technician');
        }
    }
    // ------------- End Updated Kicker Calculation Logic -------------
    
    const debouncedCalculateKicker = debounce(calculateKicker, 300);
    document.getElementById("calculateBtn").addEventListener("click", calculateKicker);
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener("input", debouncedCalculateKicker);
    });
    
    function initializeJobSelection() {
        populateJobCategories();
        document.getElementById("jobTypeRow").style.display = 'none';
        document.getElementById("jobTypeSearchRow").style.display = 'none';
    }
    initializeJobSelection();
    
    window.calculateKicker = calculateKicker;
});