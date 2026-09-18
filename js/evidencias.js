document.addEventListener('DOMContentLoaded', () => {

    // =====================================================
    // ELEMENTOS
    // =====================================================

    const evidenceCards =
        document.querySelectorAll('.evidence-card');

    const modal =
        document.getElementById('evidenceModal');

    const closeModal =
        document.getElementById('closeModal');

    const modalOverlay =
        document.querySelector('.modal-overlay');

    const modalTitle =
        document.getElementById('modalTitle');

    const modalDescription =
        document.getElementById('modalDescription');

    const karenButton =
        document.getElementById('karenButton');

    const rudyButton =
        document.getElementById('rudyButton');


    // =====================================================
    // ELEMENTOS DEL VISOR
    // =====================================================

    const documentModal =
        document.getElementById('documentModal');

    const documentOverlay =
        document.querySelector('.document-overlay');

    const closeDocument =
        document.getElementById('closeDocument');

    const documentTitle =
        document.getElementById('documentTitle');

    const documentPage =
        document.getElementById('documentPage');


    // =====================================================
    // EVIDENCIAS
    // =====================================================

    const evidencias = {

        1: {
            titulo: 'Cuento de la sapa caramelo',
            descripcion: 'Consulta el trabajo realizado por cada integrante.',

            karen: 'assets/evidencias/evidencia1/karen.docx',
            rudy: 'assets/evidencias/evidencia1/rudy.docx'
        },

        2: {
            titulo: 'Taller tipos de comunicación',
            descripcion: 'Consulta el trabajo realizado por cada integrante.',

            karen: 'assets/evidencias/evidencia2/karen.docx',
            rudy: 'assets/evidencias/evidencia2/rudy.docx'
        },

        3: {
            titulo: 'Presentación funciones del lenguaje',
            descripcion: 'Consulta el trabajo realizado por cada integrante.',

            // EVIDENCIA 3 AHORA ES PDF
            karen: 'assets/evidencias/evidencia3/karen.pdf',
            rudy: 'assets/evidencias/evidencia3/rudy.pdf'
        },

        4: {
            titulo: 'Comunicación no verbal',
            descripcion: 'Consulta el trabajo realizado por cada integrante.',

            karen: 'assets/evidencias/evidencia4/karen.docx',
            rudy: 'assets/evidencias/evidencia4/rudy.docx'
        },

        5: {
            titulo: 'Reflexiones',
            descripcion: 'Consulta el trabajo realizado por cada integrante.',

            karen: 'assets/evidencias/evidencia5/karen.docx',
            rudy: 'assets/evidencias/evidencia5/rudy.docx'
        },

        6: {
            titulo: 'Personas con las que no me llevo',
            descripcion: 'Consulta el trabajo realizado por cada integrante.',

            karen: 'assets/evidencias/evidencia6/karen.docx',
            rudy: 'assets/evidencias/evidencia6/rudy.docx'
        }

    };


    // =====================================================
    // ABRIR CARTA
    // =====================================================

    evidenceCards.forEach(card => {

        card.addEventListener('click', () => {

            // Evitar múltiples clics durante el giro
            if (card.classList.contains('opening')) {
                return;
            }


            const evidenceNumber =
                card.getAttribute('data-evidence');

            const evidence =
                evidencias[evidenceNumber];


            if (!evidence) {
                return;
            }


            // =================================================
            // GIRO DE 360°
            // =================================================

            card.classList.add('opening');


            // =================================================
            // ABRIR MODAL DESPUÉS DEL GIRO
            // =================================================

            setTimeout(() => {

                modalTitle.textContent =
                    evidence.titulo;

                modalDescription.textContent =
                    evidence.descripcion;


                // Guardar las rutas en los botones
                karenButton.dataset.file =
                    evidence.karen;

                rudyButton.dataset.file =
                    evidence.rudy;


                // Guardar nombre de la evidencia
                karenButton.dataset.name =
                    evidence.titulo;

                rudyButton.dataset.name =
                    evidence.titulo;


                // Mostrar modal
                modal.classList.add('active');

                document.body.style.overflow =
                    'hidden';


                // Permitir volver a girar la carta
                card.classList.remove('opening');

            }, 1000);

        });

    });


    // =====================================================
    // ABRIR DOCUMENTO
    // =====================================================

    const openDocument = async (file, person) => {

        if (!file) {
            return;
        }


        // Mostrar visor
        documentModal.classList.add('active');

        document.body.style.overflow =
            'hidden';


        // Cambiar título
        documentTitle.textContent =
            `${person} — Documento`;


        // Mostrar mensaje mientras carga
        documentPage.innerHTML = `
            <div class="document-loading">

                <div class="loading-spinner"></div>

                <p>
                    Cargando documento...
                </p>

            </div>
        `;


        try {

            // =================================================
            // SI ES PDF
            // =================================================

            if (file.toLowerCase().endsWith('.pdf')) {

                documentPage.innerHTML = `
                    <iframe
                        src="${file}"
                        class="pdf-viewer"
                        title="${person} — Documento PDF">
                    </iframe>
                `;

                return;
            }


            // =================================================
            // SI ES DOCX
            // =================================================

            if (file.toLowerCase().endsWith('.docx')) {

                const response =
                    await fetch(file);


                if (!response.ok) {

                    throw new Error(
                        `No se pudo encontrar el archivo: ${file}`
                    );

                }


                // Convertir respuesta a ArrayBuffer
                const arrayBuffer =
                    await response.arrayBuffer();


                // Convertir DOCX a HTML con Mammoth
                const result =
                    await mammoth.convertToHtml({
                        arrayBuffer: arrayBuffer
                    });


                // Mostrar documento
                documentPage.innerHTML =
                    result.value;


                // Mostrar mensajes de Mammoth en consola
                if (
                    result.messages &&
                    result.messages.length > 0
                ) {

                    console.log(
                        'Mammoth:',
                        result.messages
                    );

                }


                return;
            }


            // =================================================
            // FORMATO NO COMPATIBLE
            // =================================================

            throw new Error(
                'Formato de archivo no compatible.'
            );


        } catch (error) {

            console.error(
                'Error al abrir documento:',
                error
            );


            documentPage.innerHTML = `
                <div class="document-error">

                    <div class="error-icon">
                        !
                    </div>

                    <h3>
                        No se pudo abrir el documento
                    </h3>

                    <p>
                        Verifica que el archivo exista,
                        que la ruta sea correcta y que
                        el formato sea compatible.
                    </p>

                </div>
            `;

        }

    };


    // =====================================================
    // BOTÓN KAREN
    // =====================================================

    karenButton.addEventListener(
        'click',
        () => {

            const file =
                karenButton.dataset.file;

            openDocument(
                file,
                'KAREN'
            );

        }
    );


    // =====================================================
    // BOTÓN RUDY
    // =====================================================

    rudyButton.addEventListener(
        'click',
        () => {

            const file =
                rudyButton.dataset.file;

            openDocument(
                file,
                'RUDY'
            );

        }
    );


    // =====================================================
    // CERRAR MODAL DE PERSONAS
    // =====================================================

    const closeEvidenceModal = () => {

        modal.classList.remove('active');

        document.body.style.overflow =
            '';

    };


    closeModal.addEventListener(
        'click',
        closeEvidenceModal
    );


    modalOverlay.addEventListener(
        'click',
        closeEvidenceModal
    );


    // =====================================================
    // CERRAR DOCUMENTO
    // =====================================================

    const closeDocumentViewer = () => {

        documentModal.classList.remove('active');

        documentPage.innerHTML =
            '';

        document.body.style.overflow =
            '';

    };


    closeDocument.addEventListener(
        'click',
        closeDocumentViewer
    );


    documentOverlay.addEventListener(
        'click',
        closeDocumentViewer
    );


    // =====================================================
    // TECLA ESC
    // =====================================================

    document.addEventListener(
        'keydown',
        event => {

            if (event.key !== 'Escape') {
                return;
            }


            // Si está abierto el documento,
            // cerrar primero el documento

            if (
                documentModal.classList.contains('active')
            ) {

                closeDocumentViewer();

                return;

            }


            // Si no, cerrar modal de personas

            if (
                modal.classList.contains('active')
            ) {

                closeEvidenceModal();

            }

        }
    );

});