<template>
  <div class="chcc-page">
    <h1>Concepcion Holy Cross College Departments</h1>
    <p>Explore our different colleges, programs, and official Facebook pages.</p>

    <div class="department-grid">
      <!-- Computer Science -->
      <div class="department-card">
        <img src="../assets/img/logos/comlogo.png" alt="Computer Studies Logo" />
        <h3>Bachelor of Science in Computer Science</h3>
        <p>
          Prepares students to design complex software systems, develop algorithms, and innovate tech solutions.
        </p>
        <a
          href="https://www.facebook.com/CHCCIComputerStudiesStudentCouncil"
          target="_blank"
          class="btn"
          >Visit Page</a
        >
      </div>

      <!-- Criminology -->
      <div class="department-card">
        <img src="../assets/img/logos/crimlogo.png" alt="Criminology Logo" />
        <h3>Bachelor of Science in Criminology</h3>
        <p>
          Provides knowledge in criminal law, investigation, and forensic science for public safety careers.
        </p>
        <a
          href="https://www.facebook.com/people/CHCCI-Criminal-Justice-Education-Student-Council/61555653179696/"
          target="_blank"
          class="btn"
          >Visit Page</a
        >
      </div>

      <!-- Hospitality Management -->
      <div class="department-card">
        <img src="../assets/img/logos/hmlogo.png" alt="Hospitality Management Logo" />
        <h3>Bachelor of Science in Hospitality Management</h3>
        <p>
          Trains students in hotel, restaurant, and tourism operations with business strategies.
        </p>
        <a
          href="https://www.facebook.com/people/CHCCI-Hospitality-Management-Student-Council/100086487848871/"
          target="_blank"
          class="btn"
          >Visit Page</a
        >
      </div>

      <!-- Accountancy -->
      <div class="department-card">
        <img src="../assets/img/logos/bsalogo.png" alt="Accountancy Logo" />
        <h3>Bachelor of Science in Accountancy</h3>
        <p>
          Builds skills in auditing, taxation, and financial reporting for public accounting careers.
        </p>
        <a
          href="https://www.facebook.com/ChccCbaaCollegeStudentCouncil"
          target="_blank"
          class="btn"
          >Visit Page</a
        >
      </div>

      <!-- Business Administration -->
      <div class="department-card">
        <img src="../assets/img/logos/bsalogo.png" alt="Business Admin Logo" />
        <h3>Bachelor of Science in Business Administration</h3>
        <p>
          Emphasizes marketing management and leadership in business ventures.
        </p>
        <a
          href="https://www.facebook.com/ChccCbaaCollegeStudentCouncil"
          target="_blank"
          class="btn"
          >Visit Page</a
        >
      </div>

      <!-- Nursing -->
      <div class="department-card">
        <img src="../assets/img/logos/nursinglogo.png" alt="Nursing Logo" />
        <h3>Bachelor of Science in Nursing</h3>
        <p>
          Delivers training in safe, ethical, and science-based patient care across healthcare settings.
        </p>
        <a
          href="https://www.facebook.com/people/CHCCI-School-of-Nursing-Student-Council/61552863952988/"
          target="_blank"
          class="btn"
          >Visit Page</a
        >
      </div>

      <!-- Elementary Education -->
      <div class="department-card">
        <img src="../assets/img/logos/educlogo.png" alt="Elementary Education Logo" />
        <h3>Bachelor of Elementary Education</h3>
        <p>
          Equips future teachers with content and teaching skills for grades 1–6 learners.
        </p>
        <a
          href="https://www.facebook.com/CHCCTeacherEducationStudentCouncil"
          target="_blank"
          class="btn"
          >Visit Page</a
        >
      </div>

      <!-- Secondary Education -->
      <div class="department-card">
        <img src="../assets/img/logos/educlogo.png" alt="Secondary Education Logo" />
        <h3>Bachelor of Secondary Education</h3>
        <p>
          Prepares high school educators with specialization and classroom leadership skills.
        </p>
        <a
          href="https://www.facebook.com/CHCCTeacherEducationStudentCouncil"
          target="_blank"
          class="btn"
          >Visit Page</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChccPage",
};
</script>

<style scoped>
.chcc-page {
  padding: 40px 20px;
  font-family: "Poppins", sans-serif;
  color: #1c3d5c;
  text-align: center;
  background-color: #f8f9fb;
}

h1 {
  font-size: 2rem;
  color: #003366;
  margin-bottom: 10px;
}

p {
  color: #555;
  margin-bottom: 40px;
}

.department-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  gap: 25px;
  justify-items: center;
}

.department-card {
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 25px;
  width: 100%;
  max-width: 300px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.department-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.department-card img {
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin-bottom: 15px;
}

.department-card h3 {
  color: #002b5c;
  font-size: 1.1rem;
  margin-bottom: 10px;
}

.department-card p {
  font-size: 0.95rem;
  color: #555;
  min-height: 60px;
}

.btn {
  display: inline-block;
  margin-top: 15px;
  padding: 8px 16px;
  background-color: #0056b3;
  color: white;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #003d80;
}
</style>
